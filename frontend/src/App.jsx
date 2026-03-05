import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Mentoring from './components/Mentoring'
import Certifications from './components/Certifications'
import portfolioData from './portfolioData.json'

const App = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark'
  })

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('portfolio-theme', next)
      return next
    })
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div data-theme={theme}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <div style={{ paddingTop: '68px' }}>
        <About personal={portfolioData.personal} />
        <Skills skills={portfolioData.skills} />
        <Projects projects={portfolioData.projects} />
        <Experience experience={portfolioData.experience} />
        <Mentoring mentoring={portfolioData.mentoring} />
        <Certifications certifications={portfolioData.certifications} />
        <Contact personal={portfolioData.personal} />
      </div>
    </div>
  )
}

export default App