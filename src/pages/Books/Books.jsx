import { useEffect, useState } from "react";
import './books.css';
import api from "../../utils/api";
import Cookies from 'js-cookie';
import Navbar from "../../components/Navbar/Navbar";
import { FaHeart } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


export default function Books() {

    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [favorites, setFavorites] = useState([]);

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

            const favoritesResponse = await api.get('favorite', {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });

            console.log(favoritesResponse.data.favorites);

            if (favoritesResponse) {
                setFavorites(favoritesResponse.data.favorites);
            }

        } catch (error) {
            alert("Não foi possível listar os livros: ", error);
        }
    }

    useEffect(() => {
        listBooks();
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

            <Navbar back>Cadastro de Livro</Navbar>

            <input
                type="text"
                name=""
                id=""
                placeholder="Buscar Livros"
                className="books-search"
                onChange={(e) => setSearch(e.target.value)}
            />

            <ul className="books-list">

                {books && books.length > 0 ? books.map((book) => (
                    <li key={book.id} className="book-item">
                        <img src={book.cover_image} alt="capa do livro" className="book-img" />
                        <div className="div-item">
                            <p className="book-name">{book.title}</p>
                            <p><label>Autor:</label> {book.author}</p>
                            <p className="book-description"><label>Descrição:</label> {book.description ?? "Sem descrição"}</p>
                            <p><label>Categoria:</label> {book.category}</p>
                        </div>
                        <FaHeart
                            className={favorites.some(favorite => favorite.id === book.id) ? "liked-icon active" : "liked-icon inactive"} 
                            onClick={() => toggleFavorite(book.id)}
                        />
                    </li>
                )) : (<p>Sem Livros para Listar</p>)}

            </ul>
            <FaCirclePlus className="plus-icon" onClick={() => nav('/register-book')}/>
            
        </div>
    )
}