import './App.css'
import Login from './pages/Login/Login'
import { HashRouter, Route, Routes } from 'react-router'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Books from './pages/Books/Books'
import RegisterBook from './pages/RegisterBook/RegisterBook';
import BookInfo from './pages/BookInfo/BookInfo'
import Favorites from './pages/Favorites/Favorites'

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/books" element={<Books />}/>
        <Route path="/favorites" element={<Favorites />}/>
        <Route path="/register-book" element={<RegisterBook />}/>
        <Route path="/book-info/:id" element={<BookInfo/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App
