import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { profile } from '../data.js'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="text-lg font-semibold tracking-tight">
          {profile.name}
        </a>

        <ul className="hidden gap-8 text-sm text-slate-300 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a className="transition hover:text-white" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="text-slate-300 transition hover:text-white sm:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <ul className="space-y-1 border-t border-slate-800/60 px-6 py-4 text-sm text-slate-300 sm:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                className="block py-2 transition hover:text-white"
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
