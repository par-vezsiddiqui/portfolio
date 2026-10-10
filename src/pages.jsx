import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, Check, ChevronRight, CircleDot, Code2, ExternalLink, FileText, GraduationCap, LoaderCircle, Mail, Send } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { certificates, education, experiences, posts, projects, skillGroups } from './data/content'
import { contactService } from './services/contactService'
import { PageMeta } from './components/ui/PageMeta'
import { Button } from './components/ui/Button'
import { ProfilePhoto } from './components/ui/ProfilePhoto'

function Collection({ title, intro, children, eyebrow = 'Parvez Siddiqui', number = '01', className = '' }) {
  return (
    <section className={`page-section ${className}`}>
      <PageMeta eyebrow={eyebrow} title={title} intro={intro} number={number} />
      {children}
    </section>
  )
}

export function Home() {
  return (
    <div className="portfolio-home">
      <section className="hero section-pad portfolio-hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse-dot" /> OPEN TO FULL-STACK OPPORTUNITIES</div>
          <p className="hero-kicker">MERN STACK <span>/</span> OPERATIONS-MINDED ENGINEERING</p>
          <h1>Full-stack thinking.<br /><span>Real-world context.</span></h1>
          <p className="hero-subtitle">
            I’m Parvez Siddiqui, a Full-Stack Developer building practical web experiences with a
            foundation in operational data integrity, workflow efficiency and customer support.
          </p>
          <p className="hero-target"><span>TARGETING:</span> Full-Stack Developer</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">View My Work <ArrowDown size={16} /></a>
            <a className="button button-ghost" href="/Parvez-Siddiqui-CV.html" download>Download Resume <FileText size={16} /></a>
          </div>
          <div className="social-row portfolio-social">
            <a href="https://github.com/par-vezsiddiqui" target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 size={17} /> GitHub</a>
            <a href="https://linkedin.com/in/parvez-siddiqui26" target="_blank" rel="noreferrer" aria-label="LinkedIn"><ExternalLink size={17} /> LinkedIn</a>
            <a href="mailto:parvezsiddiqui26@navgurukul.org" aria-label="Email"><Mail size={17} /> Email</a>
          </div>
        </div>
        <div className="hero-visual" role="group" aria-label="Code profile card">
          <div className="terminal-card">
            <div className="terminal-bar"><span /><span /><span /><small>developer.js</small></div>
            <div className="terminal-code" aria-label="Developer profile code">
              <p><span className="terminal-muted">const</span> developer = {'{'}</p>
              <p><span className="terminal-key">focus</span>: <span className="terminal-string">'MERN stack'</span>,</p>
              <p><span className="terminal-key">mindset</span>: <span className="terminal-string">'build with context'</span>,</p>
              <p><span className="terminal-key">quality</span>: <span className="terminal-string">'detail first'</span></p>
              <p>{'}'}<span className="terminal-cursor" aria-hidden="true">▌</span></p>
            </div>
            <div className="terminal-caption"><span>01</span><strong>Build with purpose.</strong></div>
          </div>
        </div>
      </section>

      <section className="portfolio-section section-pad" id="about" aria-labelledby="about-heading">
        <SectionLabel number="01" label="Positioning" />
        <div className="portfolio-section-heading">
          <div><h2 id="about-heading">From operations to<br /><span>application logic.</span></h2>
            <p>I bring 2.5+ years of experience in operations, customer support, KYC, data entry and documentation to my transition into full-stack development.</p>
          </div>
          <p className="about-detail">I’m currently pursuing a BCA and building with the MERN stack. Working close to people and processes has taught me to value accurate data, clear workflows and interfaces that make the next step obvious.</p>
        </div>
        <div className="metrics-grid">
          <Metric value="2.5+" label="Years in operations" />
          <Metric value="BCA" label="Gujarat University" />
          <Metric value="MERN" label="Target stack" />
          <Metric value="IT" label="Diploma foundation" />
        </div>
      </section>

      <section className="portfolio-section section-pad" id="skills" aria-labelledby="skills-heading">
        <SectionLabel number="02" label="Technical toolkit" />
        <div className="portfolio-section-heading compact"><h2 id="skills-heading">Tools for the work.</h2><p>A practical toolkit growing through projects and hands-on experience.</p></div>
        <div className="toolkit-grid">
          {skillGroups.map(({ name, icon: Icon, items }) => <article className="toolkit-card" key={name}>
            <h3><Icon size={18} />{name}</h3>
            <div className="toolkit-pills">{items.map((skill) => <span key={skill}>{skill}</span>)}</div>
          </article>)}
        </div>
      </section>

      <section className="portfolio-section section-pad" id="experience" aria-labelledby="experience-heading">
        <SectionLabel number="03" label="Professional background" />
        <div className="portfolio-section-heading compact"><h2 id="experience-heading">Experience that keeps it real.</h2><p>Accuracy, empathy and clear communication—built through real work.</p></div>
        <div className="portfolio-timeline">
          {experiences.map((item, index) => <article className="portfolio-timeline-item" key={item.role}>
            <span className="timeline-index">0{index + 1}</span>
            <div className="timeline-main"><div className="timeline-top"><span>{item.date.replace(' - ', ' — ')}</span>{index === 0 && <span className="latest-role">LATEST ROLE</span>}</div>
              <h3>{item.role}</h3><p>{item.company}</p>
              <ul>{item.points.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul>
            </div>
          </article>)}
        </div>
      </section>

      <section className="portfolio-section section-pad" id="projects" aria-labelledby="projects-heading">
        <SectionLabel number="04" label="Selected work" />
        <div className="portfolio-section-heading compact"><h2 id="projects-heading">Projects built to learn by doing.</h2><p>Interfaces and application concepts with the problem and architecture in view.</p></div>
        <div className="portfolio-project-grid">
          {projects.map((project, index) => <article className={`portfolio-project-card ${project.highlighted ? 'highlighted-project' : ''}`} key={project.slug}>
            <div className="project-card-top"><span>0{index + 1} / {project.tag.split('/').pop().trim()}</span>{project.highlighted && <span className="project-status">{project.status}</span>}</div>
            <h3>{project.title}</h3><p>{project.description}</p>
            <ProjectArchitecture project={project} />
            <ProjectActions project={project} />
            <div className="project-card-foot"><span>{project.stack}</span>{project.caseStudyUrl && <Link to={project.caseStudyUrl}>Case study <ArrowUpRight size={15} /></Link>}</div>
          </article>)}
        </div>
      </section>

      <section className="portfolio-section section-pad" id="education" aria-labelledby="education-heading">
        <SectionLabel number="05" label="Education & certifications" />
        <div className="portfolio-section-heading compact"><h2 id="education-heading">Learning, in progress.</h2></div>
        <div className="education-cert-grid">
          <div className="portfolio-education-list">{education.map((item, index) => <article className="portfolio-education-item" key={item.title}>
            <span>0{index + 1}</span><div><small>{item.date}</small><h3>{item.title}</h3><p>{item.school}</p></div><GraduationCap size={19} />
          </article>)}</div>
          <div className="portfolio-cert-grid">{certificates.map((item, index) => <article className="portfolio-cert-card" key={item.title}>
            <span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div>
          </article>)}</div>
        </div>
      </section>

      <section className="portfolio-section section-pad" id="approach" aria-labelledby="approach-heading">
        <SectionLabel number="06" label="Why hire me" />
        <div className="portfolio-section-heading compact"><h2 id="approach-heading">Context is part of the craft.</h2></div>
        <div className="value-grid">
          <ValueCard number="01" title="I protect data quality" text="Operations work taught me how accuracy and careful validation affect outcomes." />
          <ValueCard number="02" title="I understand the workflow" text="I look beyond a screen to understand the people, process and next step around it." />
          <ValueCard number="03" title="I communicate clearly" text="Customer support experience helps me explain issues and collaborate with empathy." />
        </div>
        <div className="workflow-strip"><span><b>01</b> Understand users</span><ArrowUpRight size={16} /><span><b>02</b> Understand problems</span><ArrowUpRight size={16} /><span><b>03</b> Build solutions</span></div>
      </section>

      <section className="portfolio-section section-pad portfolio-contact" id="contact" aria-labelledby="contact-heading">
        <SectionLabel number="07" label="Get in touch" />
        <div className="portfolio-section-heading compact"><h2 id="contact-heading">Let’s build something useful.</h2><p>Open to full-stack opportunities and thoughtful conversations.</p></div>
        <div className="portfolio-contact-grid">
          <div className="contact-methods">
            <a href="mailto:parvezsiddiqui26@navgurukul.org"><Mail size={18} /><span><small>Email</small>parvezsiddiqui26@navgurukul.org</span><ArrowUpRight size={16} /></a>
            <a href="https://linkedin.com/in/parvez-siddiqui26" target="_blank" rel="noreferrer"><ExternalLink size={18} /><span><small>LinkedIn</small>linkedin.com/in/parvez-siddiqui26</span><ArrowUpRight size={16} /></a>
            <a href="https://github.com/par-vezsiddiqui" target="_blank" rel="noreferrer"><Code2 size={18} /><span><small>GitHub</small>github.com/par-vezsiddiqui</span><ArrowUpRight size={16} /></a>
            <a href="tel:9452447055"><Send size={18} /><span><small>Phone</small>9452447055</span><ArrowUpRight size={16} /></a>
          </div>
          <ContactMessageForm />
        </div>
      </section>
    </div>
  )
}

function SectionLabel({ number, label }) {
  return <p className="portfolio-section-label"><span>{number}</span><i />{label}</p>
}

function Metric({ value, label }) {
  return <article className="metric-card"><strong>{value}</strong><span>{label}</span></article>
}

function ValueCard({ number, title, text }) {
  return <article className="value-card"><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
}

function ContactMessageForm({ className = 'portfolio-contact-form', includeSubject = false }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const submitMessage = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const values = new FormData(form)
    const payload = {
      name: String(values.get('name') || '').trim(),
      email: String(values.get('email') || '').trim(),
      subject: includeSubject ? String(values.get('subject') || '').trim() : '',
      message: String(values.get('message') || '').trim(),
    }

    if (!payload.name || !payload.email || !payload.message || (includeSubject && !payload.subject)) {
      setIsSuccess(false)
      setErrorMessage('Please complete each field before sending.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setIsSuccess(false)
      setErrorMessage('Enter a valid email address so I can reply.')
      return
    }

    setIsSubmitting(true)
    setIsSuccess(false)
    setErrorMessage('')
    try {
      await contactService.sendMessage(payload)
      form.reset()
      setIsSuccess(true)
    } catch (error) {
      setErrorMessage(error instanceof Error
        ? error.message
        : 'We could not send your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return <form
    className={className}
    onSubmit={submitMessage}
    onChange={() => {
      setErrorMessage('')
      setIsSuccess(false)
    }}
    aria-busy={isSubmitting}
    noValidate
  >
    <label>Name<input name="name" autoComplete="name" maxLength="120" required /></label>
    <label>Email<input name="email" type="email" autoComplete="email" maxLength="254" required /></label>
    {includeSubject && <label>Subject<input name="subject" maxLength="160" required /></label>}
    <label>Message<textarea name="message" rows="4" maxLength="5000" required /></label>
    {errorMessage && <p className="contact-feedback error" role="alert">{errorMessage}</p>}
    {isSuccess && <p className="contact-feedback success" role="status">Thanks for reaching out. Your message was sent successfully.</p>}
    <button className="button button-primary" type="submit" disabled={isSubmitting}>
      {isSubmitting ? <><LoaderCircle className="contact-spinner" size={16} aria-hidden="true" /> Sending...</> : <>Send Message <ArrowUpRight size={16} /></>}
    </button>
  </form>
}

export function About() { return <Collection number="01" eyebrow="Positioning" title={<>From operations<br /><span>to application logic.</span></>} intro="A practical Full-Stack Developer who brings accuracy, business context and user empathy to the build process."><div className="about-grid"><div className="about-story"><ProfilePhoto variant="portrait" /><p>I am an IT Diploma graduate and BCA student with <strong>2.5+ years of experience</strong> across customer support, KYC operations, data entry, documentation and digital record management.</p><p>I am transitioning that practical problem-solving experience into full-stack web development with React.js, Node.js, Express.js, MongoDB, PostgreSQL and REST APIs.</p><div className="transition-line"><span>OPERATIONS</span><ChevronRight /><span>BUSINESS LOGIC</span><ChevronRight /><span className="highlight">FULL-STACK</span></div></div><div className="stats-grid"><Stat value="2.5+" label="Years in operations" /><Stat value="BCA" label="Gujarat University" /><Stat value="MERN" label="Target stack" /><Stat value="IT" label="Diploma foundation" /></div></div><div className="story-band"><h2>Useful technology starts with <span>listening.</span></h2><p>Customer-facing work taught me to clarify a problem before trying to solve it. That habit now shapes how I think about interfaces, data and product requirements.</p></div></Collection> }
function Stat({ value, label }) { return <div className="stat-card"><span className="stat-value">{value}</span><span>{label}</span></div> }

export function Skills() { return <Collection number="02" eyebrow="Technical toolkit" title={<>The stack behind<br /><span>the solution.</span></>} intro="Organized around the tools I use to turn a problem into a useful, maintainable experience."><div className="skills-grid">{skillGroups.map(({ name, icon: Icon, items, level }) => <article className="skill-cluster" key={name}><div className="cluster-heading"><span className="cluster-icon"><Icon /></span><div><h3>{name}</h3><small>{level}</small></div></div><div className="skill-pills">{items.map((skill) => <span key={skill}>{skill}</span>)}</div></article>)}</div></Collection> }

export function Experience() { return <Collection number="03" eyebrow="Professional background" title={<>Experience that<br /><span>keeps it real.</span></>} intro="Every role has sharpened the way I understand people, process, accuracy and product requirements."><div className="experience-rows">{experiences.map((item, index) => <article className="experience-row" key={item.role}><div className="experience-row-index">0{index + 1}</div><div className="experience-row-meta"><span>{item.date}</span><span className="timeline-status">{index === 0 ? 'Latest role' : 'Experience'}</span></div><div className="experience-row-content"><h3>{item.role}</h3><p className="timeline-company">{item.company}</p><ul>{item.points.map((point) => <li key={point}><Check size={14} />{point}</li>)}</ul></div></article>)}</div></Collection> }

export function Education() { return <Collection number="04" eyebrow="Learning in motion" title={<>The foundation<br /><span>keeps growing.</span></>} intro="Formal education and certifications supporting a hands-on transition into software development."><div className="education-layout"><div className="education-list">{education.map((item, index) => <article className="education-item" key={item.title}><div className="education-icon"><CircleDot size={20} /></div><div><span className="education-date">{item.date}</span><h3>{item.title}</h3><p>{item.school}</p></div><span className="education-index">0{index + 1}</span></article>)}</div><div className="cert-grid">{certificates.map((certificate, index) => <article className="cert-card" key={certificate.title}><span className="cert-index">0{index + 1}</span><h3>{certificate.title}</h3><p>{certificate.detail}</p></article>)}</div></div></Collection> }

function ProjectArchitecture({ project }) {
  return <>
    <div className="architecture-callout">
      <strong>Architecture focus</strong>
      <span>{project.challenge}</span>
      {project.architecture?.length > 0 && <ul>{project.architecture.map((item) => <li key={item}>{item}</li>)}</ul>}
    </div>
    {project.backendStack?.length > 0 && <div className="project-tech-tags" aria-label="Backend technologies">
      {project.backendStack.map((technology) => <span key={technology}>{technology}</span>)}
    </div>}
  </>
}

function ProjectActions({ project }) {
  if (!project.liveDemoUrl && !project.githubUrl) return null

  return <div className="project-actions">
    {project.liveDemoUrl && <a className="project-action" href={project.liveDemoUrl} target="_blank" rel="noreferrer"><ExternalLink size={15} /> Live Demo</a>}
    {project.githubUrl && <a className="project-action" href={project.githubUrl} target="_blank" rel="noreferrer"><Code2 size={15} /> GitHub Repository</a>}
  </div>
}

function ProjectArt({ project }) { return <div className={`project-row-art ${project.tone}`}><div className="project-window"><div className="window-bar"><i /><i /><i /></div><div className="mock-lines"><span /><span /><span /><b /><span /></div></div></div> }
export function Projects() { return <Collection number="05" eyebrow="Featured projects" title={<>Engineering work<br /><span>in progress.</span></>} intro="Selected interface and API explorations, presented with the problem and architecture focus in view."><div className="project-rows">{projects.map((project, index) => <article className={`project-row ${project.highlighted ? 'highlighted-project' : ''}`} key={project.slug}><div className="project-row-index">0{index + 1}</div><ProjectArt project={project} /><div className="project-row-content"><span className="art-number">{project.tag}</span>{project.highlighted && <span className="project-status">{project.status}</span>}<h3>{project.title}</h3><p>{project.description}</p><ProjectArchitecture project={project} /><ProjectActions project={project} /><div className="project-foot"><span>{project.stack}</span>{project.caseStudyUrl && <Link to={project.caseStudyUrl} aria-label={`View ${project.title}`}>Case study <ArrowUpRight size={16} /></Link>}</div></div></article>)}</div></Collection> }
export function ProjectDetail() { const { slug } = useParams(); const project = projects.find((item) => item.slug === slug); if (!project) return <NotFound />; return <Collection eyebrow="Project case study" title={project.title} intro={project.description}><div className="detail-layout"><ProjectArt project={project} /><div className="detail-copy"><p className="section-eyebrow">What this project explores</p><h2>{project.challenge}</h2><ProjectArchitecture project={project} /><p><strong>Technology:</strong> {project.stack}</p><ProjectActions project={project} /><Button to="/projects" secondary>Back to projects</Button></div></div></Collection> }

export function Posts() { return <Collection number="06" eyebrow="Technology journal" title={<>Ideas in progress.<br /><span>Notes worth sharing.</span></>} intro="Technology updates, learning experiences and practical observations from the path between operations and software development."><div className="post-grid">{posts.map((post) => <PostCard post={post} key={post.slug} />)}</div></Collection> }
function PostCard({ post }) { return <article className="post-card"><div className="post-card-top"><span>{post.category}</span><span>{post.readingTime}</span></div><h2>{post.title}</h2><p>{post.excerpt}</p><div className="tag-list">{post.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div><Link className="text-link" to={`/posts/${post.slug}`}>Read post <ArrowUpRight size={15} /></Link></article> }
export function PostDetail() { const { slug } = useParams(); const post = posts.find((item) => item.slug === slug); if (!post) return <NotFound />; const related = posts.filter((item) => item.slug !== slug).slice(0, 2); return <Collection eyebrow={post.category} title={post.title} intro={`${post.date} - ${post.readingTime}`}><div className="post-author"><ProfilePhoto variant="avatar" /><div><strong>Parvez Siddiqui</strong><span>Technology / Developer</span></div></div><article className="post-detail"><div className="tag-list">{post.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>{post.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<Link className="text-link" to="/posts">Back to posts <ArrowUpRight size={15} /></Link></article><div className="related-posts"><p className="section-eyebrow">Continue reading</p>{related.map((item) => <Link key={item.slug} to={`/posts/${item.slug}`}>{item.title}<ArrowUpRight size={15} /></Link>)}</div></Collection> }








export function Contact() { return <Collection className="contact-page" eyebrow="Connect with me" title={<>Start a<br /><span>conversation.</span></>} intro="For opportunities, collaborations, or a quick hello, send me a message or connect directly."><div className="contact-layout"><div className="contact-links"><a href="mailto:parvezsiddiqui26@navgurukul.org?subject=Portfolio%20inquiry"><Mail size={17} /><span>Email<br /><b>parvezsiddiqui26@navgurukul.org</b></span><ArrowUpRight size={16} /></a><a href="/Parvez-Siddiqui-CV.html" download><FileText size={17} /><span>Parvez Siddiqui CV<br /><b>Download resume</b></span><ArrowUpRight size={16} /></a><a href="https://linkedin.com/in/parvez-siddiqui26" target="_blank" rel="noreferrer"><ExternalLink size={17} /><span>LinkedIn<br /><b>Professional profile</b></span><ArrowUpRight size={16} /></a></div><ContactMessageForm className="contact-form" includeSubject /></div></Collection> }
export function SearchPage() { const params = new URLSearchParams(useLocation().search); const query = (params.get("q") || "").toLowerCase(); const matches = [...posts.map((item) => ({ ...item, type: "Post", path: "/posts/" + item.slug })), ...projects.map((item) => ({ ...item, type: "Project", path: "/projects/" + item.slug }))].filter((item) => (item.title + " " + (item.description || item.excerpt || "") + " " + (item.category || "")).toLowerCase().includes(query)); return <Collection eyebrow="Search" title={<>Find the next<br /><span>useful thing.</span></>} intro={query ? "Results for: " + query : "Search posts and projects."}><div className="search-results">{matches.length ? matches.map((item) => <Link to={item.path} key={item.type + "-" + item.title}><span>{item.type}</span><h2>{item.title}</h2><ArrowUpRight size={16} /></Link>) : <div className="empty-state">No matching results yet. Try another phrase.</div>}</div></Collection> }
export function NotFound() { return <Collection eyebrow="404" title={<>This page<br /><span>doesn't exist.</span></>} intro="The route you followed is not part of this platform yet."><Button to="/">Back home</Button></Collection> }
