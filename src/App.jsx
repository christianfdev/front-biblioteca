import './App.css'
import Login from './pages/Login/Login'
import { HashRouter, Route, Routes } from 'react-router'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Books from './pages/Books/Books'

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/books" element={<Books />}/>
      </Routes>
    </HashRouter>
  )
}

export default App
