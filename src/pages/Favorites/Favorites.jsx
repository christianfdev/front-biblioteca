import { useEffect, useState } from "react";
import './favorites.css';
import api from "../../utils/api";
import Cookies from 'js-cookie';
import Navbar from "../../components/Navbar/Navbar";
import { FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

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
                    <li key={favorite.id} className="book-item">
                        <img src={favorite.cover_image} alt="capa do livro" className="book-img" />
                        <div className="div-item">
                            <p className="book-name">{favorite.title}</p>
                            <p><label>Autor:</label> {favorite.author}</p>
                            <p><label>Categoria:</label> {favorite.category}</p>
                            <p className="book-description"><label>Descrição:</label> {favorite.description ?? "Sem descrição"}</p>

                            <div className="div-about">
                                <button className="btn-about" onClick={() => nav(`/book-info/${favorite.id}`)}>
                                    Sobre
                                </button>
                            </div>
                            
                        </div>

                        <FaRegWindowClose className="remove-icon" onClick={() => removeFavorite(favorite.id)} />
                        
                    </li>
                )) : (<p>Você não possui livros favoritos.</p>)}

            </ul>
            
        </div>
    )
}