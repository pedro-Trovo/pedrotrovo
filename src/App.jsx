import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Experiences from './pages/Experiences'
import Contato from './pages/Contato'
import SkillsPage from './pages/SkillsPage'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projetos" element={<Projects />} />
        <Route path="projetos/:slug" element={<ProjectDetail />} />
        <Route path="skills" element={<SkillsPage />} />
        <Route path="experiencias" element={<Experiences />} />
        <Route path="experiencias/profissional" element={<Experiences />} />
        <Route path="experiencias/academica" element={<Experiences />} />
        <Route path="contato" element={<Contato />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
