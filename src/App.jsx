import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'

const fromPage = (name) => lazy(() => import('./pages').then((module) => ({ default: module[name] })))
const Home = fromPage('Home')
const About = fromPage('About')
const Skills = fromPage('Skills')
const Education = fromPage('Education')
const Experience = fromPage('Experience')
const Projects = fromPage('Projects')
const ProjectDetail = fromPage('ProjectDetail')
const Posts = fromPage('Posts')
const PostDetail = fromPage('PostDetail')
const Contact = fromPage('Contact')
const SearchPage = fromPage('SearchPage')
const NotFound = fromPage('NotFound')

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="route-loading" role="status" aria-live="polite">Loading page...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/education" element={<Education />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:slug" element={<PostDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
