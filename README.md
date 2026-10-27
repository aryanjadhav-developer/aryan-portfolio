# Aryan Jadhav — Portfolio

Personal portfolio with an interactive **React + framer-motion** front end and an
**ASP.NET Core 9 Web API** back end. "Terminal-neon" dark theme. Deployable to
[Render](https://render.com) as two services via the included blueprint.

```
aryan-portfolio/
├─ backend/Portfolio.Api/   # .NET 9 minimal API — profile/projects JSON + contact form (EF Core + SQLite)
├─ frontend/                # Vite + React + TypeScript + framer-motion
├─ render.yaml              # Render blueprint (API + static site)
└─ README.md
```

## Features

- Animated hero (typewriter role, terminal card), scroll-reveal sections, cursor glow, scroll progress — all respecting `prefers-reduced-motion`.
- Sections: About, Skills, Projects, Experience/Education, Contact.
- Contact form posts to the API, which validates and stores messages in SQLite.
- **Resilient:** if the API is cold/offline, the site renders from bundled fallback data and shows an "API: static fallback" badge.

## Tech

| Layer    | Stack |
|----------|-------|
| Frontend | React 18, TypeScript, Vite 5, framer-motion 11, lucide-react |
| Backend  | ASP.NET Core 9 (minimal API), EF Core 9, SQLite, Swagger |
| Deploy   | Render (Docker web service + static site) |

## Run locally

Two terminals.

**Backend** (http://localhost:5099):

```bash
cd backend/Portfolio.Api
dotnet run
```

**Frontend** (http://localhost:5173):

```bash
cd frontend
npm install
npm run dev
```

The frontend reads the API base from `frontend/.env` (`VITE_API_URL=http://localhost:5099`).

## API

| Method | Route                  | Purpose                        |
|--------|------------------------|--------------------------------|
| GET    | `/health`              | Health check                   |
| GET    | `/api/profile`         | Profile, skills, experience    |
| GET    | `/api/projects`        | All projects                   |
| GET    | `/api/projects/{slug}` | One project                    |
| POST   | `/api/contact`         | Submit contact message         |

## Deploy to Render

1. Push this repo to GitHub.
2. In Render: **New → Blueprint**, pick the repo. It reads `render.yaml` and creates:
   - `aryan-portfolio-api` (Docker, .NET)
   - `aryan-portfolio-web` (static site)
3. After the first deploy, set the two cross-URLs (both are `sync:false` in the blueprint) and redeploy:
   - API → `Cors__AllowedOrigins__0` = the web site URL
   - Web → `VITE_API_URL` = the API service URL

> Free plan: the API sleeps when idle (~50s cold start) and uses an ephemeral
> filesystem, so contact messages reset on restart. For durable storage, enable
> the disk block in `render.yaml` on a paid instance or use managed Postgres.

## Links

- GitHub: https://github.com/aryanjadhav-developer
- LinkedIn: https://www.linkedin.com/in/aryan-jadhav07
