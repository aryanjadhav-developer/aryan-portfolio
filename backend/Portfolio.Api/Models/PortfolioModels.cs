namespace Portfolio.Api.Models;

public record Profile(
    string Name,
    string Title,
    string Tagline,
    string Summary,
    string Location,
    string Email,
    string Phone,
    string GitHub,
    string LinkedIn,
    IReadOnlyList<SkillGroup> Skills,
    IReadOnlyList<Experience> Experience,
    Education Education,
    IReadOnlyList<string> Certifications
);

public record SkillGroup(string Category, IReadOnlyList<string> Items);

public record Experience(
    string Company,
    string Role,
    string Period,
    string Location,
    IReadOnlyList<string> Highlights
);

public record Education(string Institution, string Degree, string Period, string Location);

public record Project(
    string Slug,
    string Title,
    string Summary,
    IReadOnlyList<string> Highlights,
    IReadOnlyList<string> Tech,
    string? RepoUrl,
    string? LiveUrl,
    bool Featured
);
