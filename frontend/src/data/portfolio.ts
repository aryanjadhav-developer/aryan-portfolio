import type { Profile, Project } from '../types'

/**
 * Static fallback mirror of the .NET API's data. The site renders fully from
 * these even if the API is unreachable (first cold start on Render, offline, etc.).
 * The live API, when available, overrides these.
 */
export const fallbackProfile: Profile = {
  name: 'Aryan Jadhav',
  title: 'Software Developer',
  tagline: 'I build scalable backends and clean, maintainable web apps.',
  summary:
    'Software Developer with hands-on experience designing, developing, and maintaining ' +
    'scalable applications and services across .NET and Java stacks. Passionate about clean ' +
    'code, pragmatic architecture, and delivering quality results.',
  location: 'Pune, Maharashtra, India',
  email: 'aryanjadhav4305@gmail.com',
  phone: '+91 7972275127',
  github: 'https://github.com/aryanjadhav-developer',
  linkedin: 'https://www.linkedin.com/in/aryan-jadhav07',
  skills: [
    { category: 'Languages', items: ['C#', 'Java', 'SQL', 'JavaScript', 'HTML5', 'CSS3'] },
    { category: 'Frameworks', items: ['ASP.NET Core MVC', 'ASP.NET Core Web API', 'Entity Framework Core', 'Spring Boot', 'Spring Security'] },
    { category: 'Databases', items: ['SQL Server', 'MySQL', 'PostgreSQL', 'SQLite'] },
    { category: 'Platforms & Tools', items: ['Acumatica ERP', 'Git', 'GitHub', 'Visual Studio', 'IntelliJ IDEA', 'AWS (Basics)'] },
    { category: 'Practices', items: ['REST APIs', 'Repository / Unit of Work', 'Dependency Injection', 'Identity & Auth', 'LINQ optimization'] },
  ],
  experience: [
    {
      company: 'Zingworks LLP',
      role: 'Software Developer',
      period: 'Nov 2025 - Present',
      location: 'Pune',
      highlights: [
        'Contributing to application development and maintenance across business systems.',
        'Developed and customized business applications using Acumatica ERP and ASP.NET Core to meet client requirements.',
      ],
    },
    {
      company: 'Coditas Solutions LLP',
      role: 'Software Development Intern',
      period: 'Jul 2025 - Oct 2025',
      location: 'Pune',
      highlights: [
        'Built and maintained web applications using ASP.NET Core MVC, C#, and Entity Framework Core.',
        'Implemented authentication and authorization with ASP.NET Core Identity and secure role-based access.',
        'Improved application performance by ~20% through optimized LINQ queries and database design on SQL Server.',
      ],
    },
    {
      company: 'Flynaut SaaS Pvt. Ltd.',
      role: 'Java Developer Intern',
      period: 'Mar 2025 - Jun 2025',
      location: 'Pune',
      highlights: [
        'Developed Java-based web applications using Spring Boot, Spring Security, and MySQL.',
        'Gained hands-on exposure to AWS cloud services: scalability, load balancing, and architecture.',
      ],
    },
  ],
  education: {
    institution: 'CSMSS Chh. Shahu College of Engineering',
    degree: 'B.Tech in Computer Science and Engineering',
    period: '2021 - 2025',
    location: 'Chh. Sambhajinagar, Maharashtra',
  },
  certifications: ['Compiler Design (NPTEL)', 'Cloud Computing (NPTEL)', 'SQL Development (Simplilearn)'],
}

export const fallbackProjects: Project[] = [
  {
    slug: 'meeting-room-booking',
    title: 'Meeting Room Booking',
    summary: 'Real-time meeting-room booking app with live availability updates over WebSockets.',
    highlights: [
      'Built a full-stack booking system on ASP.NET Core 9 with a React 19 front end.',
      'Used SignalR to push real-time room availability and booking updates to all connected clients.',
      'Modeled rooms, bookings, and conflicts with EF Core and prevented double-booking at the data layer.',
    ],
    tech: ['ASP.NET Core 9', 'SignalR', 'React 19', 'EF Core', 'C#'],
    repoUrl: 'https://github.com/aryanjadhav-developer/meeting-room-booking',
    liveUrl: null,
    featured: true,
  },
  {
    slug: 'bulky-web',
    title: 'Bulky Web - E-Commerce Platform',
    summary: 'Full-stack e-commerce web app for managing products, categories, and orders.',
    highlights: [
      'Developed a full-stack store with ASP.NET Core MVC and Entity Framework Core.',
      'Integrated role-based authentication and authorization with ASP.NET Core Identity for admin/user access.',
      'Applied Repository and Unit of Work patterns with Dependency Injection for a clean architecture.',
      'Built responsive Razor views (HTML5/CSS3) backed by SQL Server for efficient persistence.',
    ],
    tech: ['C#', 'ASP.NET Core MVC', 'EF Core', 'Identity', 'Razor', 'SQL Server'],
    repoUrl: 'https://github.com/aryanjadhav-developer',
    liveUrl: null,
    featured: true,
  },
  {
    slug: 'personalized-learning',
    title: 'Online Personalized Learning Application',
    summary: 'Peer-to-peer learning platform where users both teach and learn collaboratively.',
    highlights: [
      'Built a web application enabling peer-to-peer knowledge exchange.',
      'Implemented a responsive UI with Thymeleaf, HTML, and CSS for a consistent cross-device experience.',
      'Secured the app with Spring Security over a MySQL-backed Spring Boot service.',
    ],
    tech: ['Java', 'Spring Boot', 'Spring Security', 'Thymeleaf', 'MySQL'],
    repoUrl: 'https://github.com/aryanjadhav-developer',
    liveUrl: null,
    featured: false,
  },
  {
    slug: 'pan-validation',
    title: 'PAN Card Data Validation & Cleaning System',
    summary: 'ETL pipeline that validates and cleans 10,000+ identity records with SQL and regex.',
    highlights: [
      'Designed an ETL flow: extracted raw Excel data, transformed to CSV, loaded into PostgreSQL.',
      'Cleaned and validated 10,000+ records - missing values, duplicates, and inconsistent formatting.',
      'Enforced data accuracy with SQL functions and regex-based validation rules.',
    ],
    tech: ['PostgreSQL', 'SQL', 'Regex', 'ETL'],
    repoUrl: 'https://github.com/aryanjadhav-developer',
    liveUrl: null,
    featured: false,
  },
]
