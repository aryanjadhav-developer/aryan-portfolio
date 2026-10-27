import { Reveal, SectionHeading } from './motion'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeading idx="01 / about" title={<>Engineer who sweats <span className="grad-text">the details</span></>} />
        <div className="about-split">
          <Reveal className="about-lead">
            <p className="lead-big">
              I&apos;m a <span className="grad-text">Software Developer</span> who turns complex business
              requirements into <span className="grad-text">practical, scalable software</span>.
            </p>
            <p className="lead-tag">Always learning. Always building. Always looking for a better way to solve the problem.</p>
          </Reveal>

          <Reveal delay={0.1} className="about-body glass spot pad-lg">
            <p>
              Currently, I work across the <strong>.NET ecosystem</strong>, building real-world applications,
              optimizing performance, and developing solutions that solve business problems. Alongside application
              development, I work with <strong>Acumatica ERP</strong>, delivering customizations, integrations, and
              reliable technical support to clients.
            </p>
            <p>
              My experience spans backend development, database optimization, API integration, and ERP customization.
              I enjoy digging into challenging problems, improving existing systems, and using AI-assisted development
              to work smarter and deliver better results.
            </p>
            <p style={{ marginBottom: 0 }}>
              For me, good software isn&apos;t just about making things work — it&apos;s about making them{' '}
              <strong>efficient, maintainable, and built to scale.</strong>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
