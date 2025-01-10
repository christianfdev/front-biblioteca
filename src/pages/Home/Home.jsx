import './home.css';
import Navbar from '../../components/Navbar/Navbar';


import { HiArrowSmLeft } from 'react-icons/hi';

export default function Home (){
    return(
        
        <div className='home-container'>
            <Navbar>Página Inicial</Navbar>
            
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



                <div className='home-spaces'>

                </div>



                <div className='home-spaces'>

                </div>

            </div>

        </div>

    )
}