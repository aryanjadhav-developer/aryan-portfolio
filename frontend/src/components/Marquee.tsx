const ITEMS = [
  'C#', 'ASP.NET Core', 'Entity Framework', 'SignalR', 'React', 'TypeScript',
  'SQL Server', 'PostgreSQL', 'Java', 'Spring Boot', 'Acumatica ERP', 'REST APIs',
  'Clean Architecture', 'Git', 'AWS',
]

export default function Marquee() {
  const loop = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((t, i) => (
          <span className="marquee-item" key={i}><span className="dot">◆</span> {t}</span>
        ))}
      </div>
    </div>
  )
}
