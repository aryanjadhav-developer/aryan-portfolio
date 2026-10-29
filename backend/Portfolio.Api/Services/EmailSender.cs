using System.Text;
using System.Text.Json;

namespace Portfolio.Api.Services;

/// <summary>
/// Sends email through the Brevo (Sendinblue) HTTP API — the same provider the
/// CabinBooking project uses. Configure Brevo:ApiKey and Email:From. When no
/// API key is set, it no-ops and just logs (so local dev still works).
/// </summary>
public class EmailSender(IConfiguration config, ILogger<EmailSender> logger)
{
    private static readonly HttpClient Http = new();

    public async Task<bool> SendAsync(
        string toEmail,
        string subject,
        string htmlBody,
        string? replyToEmail = null,
        string? replyToName = null,
        CancellationToken ct = default)
    {
        var apiKey = config["Brevo:ApiKey"];
        if (string.IsNullOrWhiteSpace(apiKey))
        {
            logger.LogInformation("No Brevo API key configured. Email to {To} not sent (logged only): {Subject}", toEmail, subject);
            return false;
        }

        var fromAddress = config["Email:From"] ?? "onboarding@brevo.com";
        var fromName = config["Email:FromName"] ?? "Portfolio Contact";

        try
        {
            object payload = replyToEmail is { Length: > 0 }
                ? new
                {
                    sender = new { name = fromName, email = fromAddress },
                    to = new[] { new { email = toEmail } },
                    replyTo = new { email = replyToEmail, name = replyToName ?? replyToEmail },
                    subject,
                    htmlContent = htmlBody
                }
                : new
                {
                    sender = new { name = fromName, email = fromAddress },
                    to = new[] { new { email = toEmail } },
                    subject,
                    htmlContent = htmlBody
                };

            using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.brevo.com/v3/smtp/email");
            request.Headers.Add("api-key", apiKey);
            request.Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

            using var response = await Http.SendAsync(request, ct);
            if (response.IsSuccessStatusCode)
            {
                logger.LogInformation("Sent email to {To} via Brevo", toEmail);
                return true;
            }

            var errBody = await response.Content.ReadAsStringAsync(ct);
            logger.LogWarning("Brevo send to {To} failed: {Status} {Body}", toEmail, (int)response.StatusCode, errBody);
            return false;
        }
        catch (Exception ex)
        {
            logger.LogWarning("Brevo send to {To} threw: {Error}", toEmail, ex.Message);
            return false;
        }
    }
}
