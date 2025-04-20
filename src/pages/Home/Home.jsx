import './home.css';
import Navbar from '../../components/Navbar/Navbar';
import { FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa";
import api from '../../utils/api';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

export default function Home (){

    const [mostFavorites, setMostFavorites] = useState([]);
    const [myFavorites, setMyFavorites] = useState([]);






    async function getMostFavorites(){
        
        try {
            const response = await api.get('/favorite/most', {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });

            if(response && response.status === 200){
                setMostFavorites(response.data.favorites);

            }
        } catch (error) {
            alert("Não foi possível listar os favoritos da comunidade: ", error);
        }
    }

    async function getMyFavorites(){
        
        try {
            const response = await api.get('/favorite', {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });

            if(response && response.status === 200){
                setMyFavorites(response.data.favorites);

            }
        } catch (error) {
            alert("Não foi possível listar os seus favoritos: ", error);
        }
    }

    useEffect(() => {
        getMostFavorites();
        getMyFavorites();
    }, [])



    return(
        
        <div className='home-container'>
            <Navbar back={false}>Página Inicial</Navbar>
            
            <div className='home-content'>
                
                <div className='home-spaces top-books'>
                    <h2>Livros Preferidos da <br />Comunidade</h2>

                    {mostFavorites.map((most, index) => (
                            <button key={most.id} className='top-item'>
                                #{index +1} - {most.title}
                            </button>
                        ))
                    }
                </div>



                <div className='home-spaces top-books'>
                    <h2>Meus Livros <br/>Favoritos</h2>

                    {myFavorites.map((favorite, index) => (
                                <button key={favorite.id} className='top-item'>
                                    #{index +1} - {favorite.title}
                                </button>
                            ))
                    }

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