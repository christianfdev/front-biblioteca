import './App.css'
import Login from './pages/Login/Login'
import { HashRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Register from './pages/Register/Register'

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </HashRouter>
  )
}

export default App
