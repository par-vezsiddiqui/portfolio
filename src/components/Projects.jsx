import { ExternalLink } from 'lucide-react'
import { projects } from '../data.js'

export default function Projects() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <article
          key={project.title}
          className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-slate-600"
        >
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
            {project.description}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
              >
                {tag}
              </li>
            ))}
          </ul>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
          >
            View project <ExternalLink size={15} />
          </a>
        </article>
      ))}
    </div>
  )
}
