using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Models;

namespace Portfolio.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<ContactMessage>(e =>
        {
            e.Property(x => x.Name).IsRequired().HasMaxLength(120);
            e.Property(x => x.Email).IsRequired().HasMaxLength(200);
            e.Property(x => x.Subject).HasMaxLength(160);
            e.Property(x => x.Message).IsRequired().HasMaxLength(4000);
            e.HasIndex(x => x.CreatedAtUtc);
        });
    }
}
