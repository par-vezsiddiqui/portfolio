import { useEffect, useState } from 'react'
import { ArrowUpRight, Download, Menu, Search, X } from 'lucide-react'
import { NavLink, Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { navItems } from '../../data/content'
import CookieConsent from '../ui/CookieConsent'
import { ProfilePhoto } from '../ui/ProfilePhoto'

export function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    window.scrollTo({ top: 0, behavior })
  }, [pathname])
  return null
}
 
export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const isPortfolioHome = location.pathname === '/'
  const homeNavItems = [
    { to: '#about', label: 'About' },
    { to: '#experience', label: 'Experience' },
    { to: '#projects', label: 'Projects' },
    { to: '#contact', label: 'Contact' },
  ]

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1180) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const submitSearch = (event) => {
    event.preventDefault()
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    setMenuOpen(false)
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={`navbar ${location.pathname !== '/' ? 'navbar-scrolled' : ''}`}>
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            <ProfilePhoto variant="brand" alt="" loading="eager" />
          </span>
          <span>Parvez <b>Siddiqui</b></span>
        </Link>

        <nav id="primary-navigation" className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
          {isPortfolioHome
            ? homeNavItems.map((item) => (
              <a key={item.to} href={item.to} onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))
            : navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          <a className="nav-cv" href="/Parvez-Siddiqui-CV.html" download>
            <Download size={14} /> CV
          </a>
        </nav>

        <form className="global-search" onSubmit={submitSearch}>
          <span className="global-search-icon" aria-hidden="true">
            <Search size={16} aria-hidden="true" focusable="false" />
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search portfolio"
            placeholder="Search"
          />
        </form>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      <ScrollManager />
      <main id="main-content">
        <Outlet />
      </main>
      <CookieConsent />
      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand-block">
            <Link to="/" className="brand">
              <span className="brand-mark" aria-hidden="true"><ProfilePhoto variant="brand" alt="" /></span>
              <span>Parvez <b>Siddiqui</b></span>
            </Link>
            <p>Full-Stack Developer building practical, thoughtful experiences for the web.</p>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <strong>Explore</strong>
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/experience">Experience</Link>
          </nav>
          <div className="footer-social">
            <strong>Get in touch</strong>
            <a href="mailto:parvezsiddiqui26@navgurukul.org">Email</a>
            <a href="https://linkedin.com/in/parvez-siddiqui26" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/par-vezsiddiqui" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        <Link className="footer-top" to="/#home">Back to top <ArrowUpRight size={15} /></Link>
        <div className="footer-bottom">
          <small>© {new Date().getFullYear()} Parvez Siddiqui</small>
          <span>Building · Learning · Improving</span>
          <div className="footer-utility">
            <button
              className="cookie-settings-trigger"
              onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
            >
              Cookie settings
            </button>
            <a href="#main-content">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
