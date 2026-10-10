import { useEffect } from 'react'

function getTextContent(content) {
  if (typeof content === 'string' || typeof content === 'number') return String(content)
  if (Array.isArray(content)) return content.map(getTextContent).join(' ')
  if (content && typeof content === 'object' && content.props) return getTextContent(content.props.children)
  return ''
}

export function PageMeta({ eyebrow, title, intro, number = '00' }) {
  const heading = getTextContent(title).replace(/\s+/g, ' ').trim()

  useEffect(() => {
    const titles = {
      Positioning: 'About - Parvez Siddiqui',
      'Technical toolkit': 'Skills - Parvez Siddiqui',
      'Professional background': 'Experience - Parvez Siddiqui',
      'Learning in motion': 'Education - Parvez Siddiqui',
      'Featured projects': 'Projects - Parvez Siddiqui',
      'Technology journal': 'Posts - Parvez Siddiqui',
      'Connect with me': 'Contact - Parvez Siddiqui',
      Search: 'Search - Parvez Siddiqui',
      '404': 'Page not found - Parvez Siddiqui',
    }
    
    const pageTitle = titles[eyebrow] || `${heading || eyebrow} - Parvez Siddiqui`
    document.title = pageTitle

    const description = typeof intro === 'string'
      ? intro
      : 'Explore Parvez Siddiqui’s work, experience, learning journey, and technology projects.'

    const updateMeta = (attribute, key, content) => {
      let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, key)
        document.head.appendChild(element)
      }
      element.content = content
    }

    updateMeta('name', 'description', description)
    updateMeta('property', 'og:title', pageTitle)
    updateMeta('property', 'og:description', description)
  }, [eyebrow, heading, intro])

  return (
    <div className="page-heading">
      <div className="section-number">{number}</div>
      <div>
        <p className="section-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {intro && <p className="heading-intro">{intro}</p>}
      </div>
    </div>
  )
}
