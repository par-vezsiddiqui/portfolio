import { Code2, Database, Layers3, Server, Sparkles } from 'lucide-react'

export const navItems = [
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/posts', label: 'Posts' },
  { to: '/contact', label: 'Connect with me' },
]

export const skillGroups = [
  { name: 'Frontend', icon: Code2, level: 'Working stack', items: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React.js', 'Bootstrap', 'DOM'] },
  { name: 'Backend', icon: Server, level: 'Working stack', items: ['Node.js', 'Express.js', 'REST APIs'] },
  { name: 'Database', icon: Database, level: 'Working knowledge', items: ['MongoDB', 'PostgreSQL'] },
  { name: 'Tools', icon: Layers3, level: 'Daily tools', items: ['Git', 'GitHub', 'Google Workspace', 'MS Excel', 'MS Word'] },
  { name: 'Domain skills', icon: Sparkles, level: 'Professional context', items: ['Problem Solving', 'Customer Support', 'KYC Verification', 'Document Validation', 'Record Management', 'Professional Communication'] },
]

export const experiences = [
  { role: 'Executive - Operations', company: 'Startek', date: '02/2026 - 04/2026', points: ['Validated customer and KYC documents against required information before record updates.', 'Coordinated follow-ups to resolve documentation discrepancies and keep cases moving.', 'Updated customer records while following confidentiality and compliance requirements.'] },
  { role: 'Customer Support Executive', company: 'CM Helpline 1076 - WE WIN Limited', date: '10/2024 - 12/2024', points: ['Logged customer grievances in CRM records to support clear tracking and follow-up.', 'Met daily call-volume and quality benchmarks while communicating with customers empathetically.', 'Captured issue details accurately so cases could be routed and reviewed consistently.'] },
  { role: 'Data Entry Operator', company: 'Jan Seva Kendra', date: '08/2022 - 11/2024', points: ['Processed digital records and government-service applications using MS Excel and Google Workspace.', 'Checked application and document details during entry to reduce incomplete or inconsistent records.', 'Demonstrated 40+ WPM typing speed and 98% accuracy across three CUPB typing and skill tests.'] },
]

export const projects = [
  { slug: 'zerodha-clone', title: 'Zerodha Clone', tag: '01 / frontend systems', description: 'A responsive trading-platform-inspired interface focused on translating a finance product into a clear, modern frontend experience.', challenge: 'Structuring a responsive interface with reusable UI patterns.', architecture: [], backendStack: [], liveDemoUrl: '', githubUrl: '', caseStudyUrl: '/projects/zerodha-clone', stack: 'React.js - JavaScript - CSS3', tone: 'gold' },
  { slug: 'github-clone', title: 'GitHub Clone', tag: '02 / api integration', description: 'A GitHub-inspired application exploring API integration, developer-focused UI design and a product structure built for technical users.', challenge: 'Connecting API-driven data to a focused developer workflow.', architecture: ['REST API integration'], backendStack: ['REST APIs'], liveDemoUrl: '', githubUrl: '', caseStudyUrl: '/projects/github-clone', stack: 'JavaScript - REST APIs - HTML5 - CSS3', tone: 'blue' },
  { slug: 'whatsapp-clone', title: 'WhatsApp Clone', tag: '03 / application structure', description: 'A messaging-platform-inspired project focused on responsive UI and the structure of a familiar communication product.', challenge: 'Organizing a responsive interface around a conversation-first experience.', architecture: [], backendStack: [], liveDemoUrl: '', githubUrl: '', caseStudyUrl: '/projects/whatsapp-clone', stack: 'JavaScript - HTML5 - CSS3', tone: 'green' },
  { slug: 'mern-operations-dashboard', title: 'MERN Operations Dashboard', tag: '04 / operations architecture', description: 'An architecture showcase for an operations dashboard, designed around secure role-aware workflows and efficient record reporting.', challenge: 'A full-stack architecture plan connecting protected operations, REST APIs and aggregation-powered reporting.', architecture: ['RBAC for role-aware access control', 'REST endpoints for operational records and workflows', 'MongoDB aggregation pipelines for reporting'], backendStack: ['Node.js', 'Express.js', 'MongoDB'], liveDemoUrl: '', githubUrl: '', caseStudyUrl: '/projects/mern-operations-dashboard', stack: 'MongoDB - Express.js - React.js - Node.js', tone: 'green', highlighted: true, status: 'Architecture showcase' },
]

export const education = [
  { title: 'BCA', school: 'Gujarat University', date: '2026 - Present' },
  { title: 'Diploma in Information Technology', school: 'Hewett Polytechnic, Lucknow - BTEUP', date: '2023 - 2026' },
]

export const certificates = [
  { title: 'The Complete Full-Stack Web Development Bootcamp', detail: 'HTML, CSS, JavaScript, React.js, Node.js, Express.js, REST APIs, PostgreSQL, MongoDB, Git and GitHub.' },
  { title: 'MongoDB Aggregation Fundamentals', detail: 'Multi-stage aggregation pipelines, data transformation and query optimization.' },
  { title: 'O Level - NIELIT', detail: 'Foundation-level Information Technology qualification.' },
  { title: 'FEA - Freedom Employability Academy', detail: 'Professional English communication, digital literacy and employability skills.' },
]

export const posts = [
  { slug: 'building-with-real-world-context', title: 'Building With Real-World Context', category: 'Developer thoughts', date: 'September 24, 2026', readingTime: '4 min read', tags: ['Product thinking', 'Learning'], excerpt: 'What operations work taught me about requirements, edge cases and the people behind every interface.', content: ['A useful product is more than a collection of screens. It has to respect the people, processes and constraints around it.', 'My experience in customer support, documentation and data operations keeps shaping how I learn software development. I look for the workflow behind a feature, the failure cases a user may meet and the smallest change that makes the next step clearer.', 'That context is becoming part of how I build: understand the problem, make the system legible, then improve it with evidence.'] },
  { slug: 'learning-the-mern-stack', title: 'Learning The MERN Stack In Public', category: 'Learning journey', date: 'September 12, 2026', readingTime: '5 min read', tags: ['React', 'Node.js', 'MongoDB'], excerpt: 'A practical look at learning full-stack development through small interfaces, APIs and repeatable habits.', content: ['Learning a full-stack stack is not just memorising tools. It is learning how data, interfaces and user expectations meet in one system.', 'I am using small projects to understand that connection: React for interfaces, Node and Express for APIs, and MongoDB or PostgreSQL for structured data.', 'The goal is steady understanding rather than inflated claims. Each project gives me a sharper question to investigate next.'] },
]
