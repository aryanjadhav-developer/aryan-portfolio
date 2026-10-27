using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;
using Portfolio.Api.Models;

var builder = WebApplication.CreateBuilder(args);

// Render (and most PaaS) inject the listen port via $PORT.
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrWhiteSpace(port))
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// --- Database (SQLite via EF Core) ---
var connString = builder.Configuration.GetConnectionString("Default")
                 ?? "Data Source=portfolio.db";
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlite(connString));

// --- CORS: front-end origins come from config/env (semicolon or array) ---
const string CorsPolicy = "frontend";
var origins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
              ?? ["http://localhost:5173"];
builder.Services.AddCors(o => o.AddPolicy(CorsPolicy, p =>
    p.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod()));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Apply migrations on startup so the SQLite schema is ready on a fresh host.
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(CorsPolicy);

// --- Endpoints ---
app.MapGet("/", () => Results.Ok(new { service = "Portfolio.Api", status = "ok" }));
app.MapGet("/health", () => Results.Ok(new { status = "healthy", time = DateTime.UtcNow }));

app.MapGet("/api/profile", () => Results.Ok(PortfolioData.Profile))
   .WithName("GetProfile");

app.MapGet("/api/projects", () => Results.Ok(PortfolioData.Projects))
   .WithName("GetProjects");

app.MapGet("/api/projects/{slug}", (string slug) =>
{
    var project = PortfolioData.Projects.FirstOrDefault(p =>
        string.Equals(p.Slug, slug, StringComparison.OrdinalIgnoreCase));
    return project is null ? Results.NotFound() : Results.Ok(project);
}).WithName("GetProject");

app.MapPost("/api/contact", async (ContactRequest req, AppDbContext db) =>
{
    var errors = new Dictionary<string, string[]>();
    if (string.IsNullOrWhiteSpace(req.Name))
        errors["name"] = ["Name is required."];
    if (string.IsNullOrWhiteSpace(req.Email) || !req.Email.Contains('@'))
        errors["email"] = ["A valid email is required."];
    if (string.IsNullOrWhiteSpace(req.Message) || req.Message.Trim().Length < 10)
        errors["message"] = ["Message must be at least 10 characters."];
    if (errors.Count > 0)
        return Results.ValidationProblem(errors);

    var msg = new ContactMessage
    {
        Name = req.Name.Trim(),
        Email = req.Email.Trim(),
        Subject = req.Subject?.Trim(),
        Message = req.Message.Trim(),
        CreatedAtUtc = DateTime.UtcNow
    };
    db.ContactMessages.Add(msg);
    await db.SaveChangesAsync();

    return Results.Ok(new { ok = true, id = msg.Id, message = "Thanks! Your message was received." });
}).WithName("PostContact");

app.Run();
