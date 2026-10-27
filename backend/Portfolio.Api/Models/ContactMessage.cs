using System.ComponentModel.DataAnnotations;

namespace Portfolio.Api.Models;

/// <summary>Persisted contact-form submission.</summary>
public class ContactMessage
{
    public int Id { get; set; }

    [Required, StringLength(120)]
    public string Name { get; set; } = string.Empty;

    [Required, EmailAddress, StringLength(200)]
    public string Email { get; set; } = string.Empty;

    [StringLength(160)]
    public string? Subject { get; set; }

    [Required, StringLength(4000)]
    public string Message { get; set; } = string.Empty;

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}

/// <summary>Shape accepted from the client; server controls Id/timestamp.</summary>
public record ContactRequest(string Name, string Email, string? Subject, string Message);
