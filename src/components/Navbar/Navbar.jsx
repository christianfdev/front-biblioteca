import './navbar.css'
import { HiArrowSmLeft } from 'react-icons/hi';

export default function Navbar ({ children }){
    return(
        <nav className='navbar'>  
            <div className='navbar-item'>
                <HiArrowSmLeft className='back-icon'/>

            </div>

            <div className='navbar-item'>
                <h1 className='home-title'>{children}</h1>

            </div>

            <div className='navbar-item'>
                <ul className='nav-options'>
                    <li><a href="#/home">Home</a></li>
                    <li><a href="#/books">Livros</a></li>
                    <li><a href="">Sair</a></li>
                </ul>

            </div>
        
        </nav>
    )


}