import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Projects from './Pages/Projects'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Dashboard from './Pages/Dashboard'
import Header from './Components/Header'
import FooterComp from './Components/Footer'
import ProtecttedRoute from './Components/ProtectedRoute'


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<ProtecttedRoute/>}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
      <FooterComp />
    </BrowserRouter>
  )
}

export default App