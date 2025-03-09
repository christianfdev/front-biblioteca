import './home.css';
import Navbar from '../../components/Navbar/Navbar';
import { FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa";

import { HiArrowSmLeft } from 'react-icons/hi';

export default function Home (){
    return(
        
        <div className='home-container'>
            <Navbar back={false}>Página Inicial</Navbar>
            
            <div className='home-content'>
                
                <div className='home-spaces top-books'>
                    <h2>Livros Preferidos da Comunidade</h2>
                    <button className='top-item'>
                       #1 - A volta dos que Não Foram
                    </button>

                    <button className='top-item'>
                        #2 - As Tranças da Vovó Careca
                    </button>

                    <button className='top-item'>
                        #3 - Poeira em Alto Mar
                    </button>

                </div>



                <div className='home-spaces top-books'>
                    <h2>Meus Livros <br/>Favoritos</h2>
                    <button className='top-item'>
                       #1 - A volta dos que Não Foram
                    </button>

                    <button className='top-item'>
                        #2 - As Tranças da Vovó Careca
                    </button>

                    <button className='top-item'>
                        #3 - Poeira em Alto Mar
                    </button>

                </div>



                <div className='home-spaces social-media'>

                <h2>Nossas <br/>Redes Sociais</h2>
                    <button className='top-item social-item'>
                        <FaDiscord className='social-icon'/>
                       <p>Discord</p>
                    </button>

                    <button className='top-item social-item'>
                        <FaInstagram className='social-icon'/>
                        <p>Instagram</p>
                    </button>

                    <button className='top-item social-item'>
                        <FaYoutube className='social-icon'/>
                        <p>Youtube</p>
                    </button>
                </div>

            </div>

        </div>

    )
}