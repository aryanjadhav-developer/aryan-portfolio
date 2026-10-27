using Portfolio.Api.Models;

namespace Portfolio.Api.Data;

/// <summary>
/// Static source of truth for profile + projects, built from the resume and GitHub.
/// Served read-only; no database needed for this content.
/// </summary>
public static class PortfolioData
{
    public static readonly Profile Profile = new(
        Name: "Aryan Jadhav",
        Title: "Software Developer",
        Tagline: "I build scalable backends and clean, maintainable web apps.",
        Summary:
            "Software Developer with hands-on experience designing, developing, and maintaining " +
            "scalable applications and services across .NET and Java stacks. Passionate about clean " +
            "code, pragmatic architecture, and delivering quality results.",
        Location: "Pune, Maharashtra, India",
        Email: "aryanjadhav4305@gmail.com",
        Phone: "+91 7972275127",
        GitHub: "https://github.com/aryanjadhav-developer",
        LinkedIn: "https://www.linkedin.com/in/aryan-jadhav07",
        Skills:
        [
            new("Languages", ["C#", "Java", "SQL", "JavaScript", "HTML5", "CSS3"]),
            new("Frameworks", ["ASP.NET Core MVC", "ASP.NET Core Web API", "Entity Framework Core", "Spring Boot", "Spring Security"]),
            new("Databases", ["SQL Server", "MySQL", "PostgreSQL", "SQLite"]),
            new("Platforms & Tools", ["Acumatica ERP", "Git", "GitHub", "Visual Studio", "IntelliJ IDEA", "AWS (Basics)"]),
            new("Practices", ["REST APIs", "Repository / Unit of Work", "Dependency Injection", "Identity & Auth", "LINQ optimization"])
        ],
        Experience:
        [
            new(
                Company: "Zingworks LLP",
                Role: "Software Developer",
                Period: "Nov 2025 - Present",
                Location: "Pune",
                Highlights:
                [
                    "Contributing to application development and maintenance across business systems.",
                    "Developed and customized business applications using Acumatica ERP and ASP.NET Core to meet client requirements."
                ]),
            new(
                Company: "Coditas Solutions LLP",
                Role: "Software Development Intern",
                Period: "Jul 2025 - Oct 2025",
                Location: "Pune",
                Highlights:
                [
                    "Built and maintained web applications using ASP.NET Core MVC, C#, and Entity Framework Core.",
                    "Implemented authentication and authorization with ASP.NET Core Identity and secure role-based access.",
                    "Improved application performance by ~20% through optimized LINQ queries and database design on SQL Server."
                ]),
            new(
                Company: "Flynaut SaaS Pvt. Ltd.",
                Role: "Java Developer Intern",
                Period: "Mar 2025 - Jun 2025",
                Location: "Pune",
                Highlights:
                [
                    "Developed Java-based web applications using Spring Boot, Spring Security, and MySQL.",
                    "Gained hands-on exposure to AWS cloud services: scalability, load balancing, and architecture."
                ])
        ],
        Education: new(
            Institution: "CSMSS Chh. Shahu College of Engineering",
            Degree: "B.Tech in Computer Science and Engineering",
            Period: "2021 - 2025",
            Location: "Chh. Sambhajinagar, Maharashtra"),
        Certifications:
        [
            "Compiler Design (NPTEL)",
            "Cloud Computing (NPTEL)",
            "SQL Development (Simplilearn)"
        ]
    );

    public static readonly IReadOnlyList<Project> Projects =
    [
        new(
            Slug: "meeting-room-booking",
            Title: "Meeting Room Booking",
            Summary: "Real-time meeting-room booking app with live availability updates over WebSockets.",
            Highlights:
            [
                "Built a full-stack booking system on ASP.NET Core 9 with a React 19 front end.",
                "Used SignalR to push real-time room availability and booking updates to all connected clients.",
                "Modeled rooms, bookings, and conflicts with EF Core and prevented double-booking at the data layer."
            ],
            Tech: ["ASP.NET Core 9", "SignalR", "React 19", "EF Core", "C#"],
            RepoUrl: "https://github.com/aryanjadhav-developer/meeting-room-booking",
            LiveUrl: null,
            Featured: true),
        new(
            Slug: "bulky-web",
            Title: "Bulky Web - E-Commerce Platform",
            Summary: "Full-stack e-commerce web app for managing products, categories, and orders.",
            Highlights:
            [
                "Developed a full-stack store with ASP.NET Core MVC and Entity Framework Core.",
                "Integrated role-based authentication and authorization with ASP.NET Core Identity for admin/user access.",
                "Applied Repository and Unit of Work patterns with Dependency Injection for a clean architecture.",
                "Built responsive Razor views (HTML5/CSS3) backed by SQL Server for efficient persistence."
            ],
            Tech: ["C#", "ASP.NET Core MVC", "EF Core", "Identity", "Razor", "SQL Server"],
            RepoUrl: "https://github.com/aryanjadhav-developer",
            LiveUrl: null,
            Featured: true),
        new(
            Slug: "personalized-learning",
            Title: "Online Personalized Learning Application",
            Summary: "Peer-to-peer learning platform where users both teach and learn collaboratively.",
            Highlights:
            [
                "Built a web application enabling peer-to-peer knowledge exchange.",
                "Implemented a responsive UI with Thymeleaf, HTML, and CSS for a consistent cross-device experience.",
                "Secured the app with Spring Security over a MySQL-backed Spring Boot service."
            ],
            Tech: ["Java", "Spring Boot", "Spring Security", "Thymeleaf", "MySQL"],
            RepoUrl: "https://github.com/aryanjadhav-developer",
            LiveUrl: null,
            Featured: false),
        new(
            Slug: "pan-validation",
            Title: "PAN Card Data Validation & Cleaning System",
            Summary: "ETL pipeline that validates and cleans 10,000+ identity records with SQL and regex.",
            Highlights:
            [
                "Designed an ETL flow: extracted raw Excel data, transformed to CSV, loaded into PostgreSQL.",
                "Cleaned and validated 10,000+ records - missing values, duplicates, and inconsistent formatting.",
                "Enforced data accuracy with SQL functions and regex-based validation rules."
            ],
            Tech: ["PostgreSQL", "SQL", "Regex", "ETL"],
            RepoUrl: "https://github.com/aryanjadhav-developer",
            LiveUrl: null,
            Featured: false)
    ];
}
