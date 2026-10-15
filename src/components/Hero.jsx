import { ArrowRight, Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons.jsx'
import { profile } from '../data.js'

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pt-20 pb-24">
      <p className="inline-flex items-center gap-2 rounded-full border border-slate-800 px-3 py-1 text-xs text-slate-400">
        <MapPin size={14} /> {profile.location}
      </p>

      <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
        {profile.name}
      </h1>
      <p className="mt-3 text-xl text-indigo-400">{profile.role}</p>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
        {profile.tagline}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-400"
        >
          View projects <ArrowRight size={18} />
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-2.5 font-medium text-slate-200 transition hover:border-slate-500 hover:text-white"
        >
          <Mail size={18} /> Get in touch
        </a>
        <div className="flex items-center gap-3 text-slate-400">
          <a aria-label="GitHub" href={profile.github} target="_blank" rel="noreferrer" className="transition hover:text-white">
            <GithubIcon size={20} />
          </a>
          <a aria-label="LinkedIn" href={profile.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-white">
            <LinkedinIcon size={20} />
          </a>
        </div>
      </div>
    </section>
  )
}
