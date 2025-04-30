import { useEffect, useState } from "react";
import './favorites.css';
import api from "../../utils/api";
import Cookies from 'js-cookie';
import Navbar from "../../components/Navbar/Navbar";

import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import LiBook from "../../components/LiBook/LiBook";


export default function Favorites() {

    const [search, setSearch] = useState('');
    const [favorites, setFavorites] = useState([]);

    const nav = useNavigate();

    async function listFavorites() {
        try {
            const endpoint = search ? `/favorite?search=${search}` : '/favorite';
            const response = await api.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });

            if (response && response.status === 200) {
                setFavorites(response.data.favorites);
            }

        } catch (error) {
            alert("Não foi possível listar os livros: ", error);
        }
    }

    useEffect(() => {
        listFavorites();
    }, [search]);

    async function removeFavorite (favoriteId) {
        
        Swal.fire({
            title: "Você deseja realmente remover este livro dos seus favoritos?",
            showCancelButton: true,
            confirmButtonText: "Sim",
            customClass: {
                title: "custom-title"
            }
          }).then((result) => {
            
            if (result.isConfirmed) {

                try {
                    api.delete(`favorite/${favoriteId}`, {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('token')}`
                        }
                    }).then(() => {
                        const updatedFavorites = favorites.filter((favorite) => favorite.id !== favoriteId);
                        setFavorites(updatedFavorites);
                        Swal.fire({
                            title: "Removido com Sucesso!",
                            icon: "success",
                            customClass: {
                                title: "custom-title",
                            }
                        });
                    })
                } catch (error) {
                    Swal.fire("Não foi possível remover o livro!", "", "error");
                }
            }
          }); 
    }

    return (
        <div className="books-container">

            <Navbar back>Meus Favoritos</Navbar>

            <input
                type="text"
                placeholder="Buscar Favoritos"
                className="books-search"
                onChange={(e) => setSearch(e.target.value)}
            />

            <ul className="books-list">

                {favorites && favorites.length > 0 ? favorites.map((favorite) => (
                    <LiBook key={favorite.id} book={favorite} toggleFavorite={removeFavorite} fav={true} favId={favorite.id} />
                )) : (<p>Você não possui livros favoritos.</p>)}

            </ul>
            
        </div>
    )
}