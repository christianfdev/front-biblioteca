import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { HashRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'

function App() {

  return (
    <HashRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/home" element={<Home />}/>
    </Routes>
  </HashRouter>

  )
}

export default App
