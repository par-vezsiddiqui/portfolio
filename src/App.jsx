import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './components/BrandIcons.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Section from './components/Section.jsx'
import Projects from './components/Projects.jsx'
import { about, profile, skills } from './data.js'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />

        <Section id="about" title="About">
          <div className="max-w-3xl space-y-4 text-slate-300">
            {about.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="grid gap-6 sm:grid-cols-3">
            {skills.map((skill) => (
              <div key={skill.group} className="rounded-xl border border-slate-800 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                  {skill.group}
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
                  {skill.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <Projects />
        </Section>

        <Section id="contact" title="Contact">
          <p className="max-w-2xl text-slate-300">
            I am open to internships, freelance work and collaboration. The fastest way to
            reach me is email.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-400"
            >
              <Mail size={17} /> {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-2.5 font-medium text-slate-200 transition hover:border-slate-500 hover:text-white"
            >
              <GithubIcon size={17} /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-2.5 font-medium text-slate-200 transition hover:border-slate-500 hover:text-white"
            >
              <LinkedinIcon size={17} /> LinkedIn
            </a>
          </div>
        </Section>
      </main>

      <footer className="border-t border-slate-800/60">
        <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-slate-500">
          © {new Date().getFullYear()} {profile.name}
        </div>
      </footer>
    </div>
  )
}
