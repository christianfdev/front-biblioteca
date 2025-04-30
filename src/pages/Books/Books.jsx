import { useEffect, useState } from "react";
import './books.css';
import api from "../../utils/api";
import Cookies from 'js-cookie';
import Navbar from "../../components/Navbar/Navbar";
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import LiBook from "../../components/LiBook/LiBook";


export default function Books() {

    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);

    const nav = useNavigate();

    async function listBooks() {
        try {
            const endpoint = search ? `/books?search=${search}` : '/books';
            const response = await api.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });

            if (response && response.status === 200) {
                setBooks(response.data.books);
            }
        } catch (error) {
            alert("Não foi possível listar os livros: ", error);
        }
    }

    async function getFavorites(){
        try {
            const favoritesResponse = await api.get('favorite', {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });
    
            if (favoritesResponse) {
                setFavorites(favoritesResponse.data.favorites);
            }
        } catch (error) {
            alert("Erro:", error);
        }
    }

    async function getMyInfo(){
        try {
            const myInfo = await api.get('/me', {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });
            
            if (myInfo.data.role === 'superadmin') {
                setIsSuperAdmin(true);
            }
        } catch (error) {
            alert("Erro:", error);
        }
    }

    useEffect(() => {
        listBooks();
        getFavorites();
        getMyInfo();
    }, [search]);

    const toggleFavorite = (bookId) => {
        const isFavorite = favorites.some(favorite => favorite.id === bookId);
    
        let updatedFavorites = [...favorites];
    
        if (isFavorite) {
            updatedFavorites = updatedFavorites.filter(favorite => favorite.id !== bookId);
            api.delete(`favorite/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });
        } else {
            updatedFavorites.push({ id: bookId });
            api.post('favorite', {
                bookId: bookId
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });
        }
    
        setFavorites(updatedFavorites);
    }

    return (
        <div className="books-container">

            <Navbar back>Livros</Navbar>

            <input
                type="text"
                placeholder="Buscar Livros"
                className="books-search"
                onChange={(e) => setSearch(e.target.value)}
            />

            <ul className="books-list">

                {books && books.length > 0 ? books.map((book) => (
                    <LiBook key={book.id} book={book} favorites={favorites} toggleFavorite={toggleFavorite}/>
                )) : (<p>Sem Livros para Listar</p>)}

            </ul>

                {isSuperAdmin ? (<FaCirclePlus className="plus-icon" onClick={() => nav('/register-book')}/>) : null}
            
        </div>
    )
}