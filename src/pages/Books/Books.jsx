import { useEffect, useState } from "react";
import './books.css';
import  api  from "../../utils/api";
import Cookies from 'js-cookie';



export default function Books (){

    const [books, setBooks] = useState([]);

    const [search, setSearch] = useState('');

    
    
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


    useEffect(() => {
        listBooks();
    }, [search])


    return (
        
        
        <div className="books-container">
            <h1 className="books-title">Catálogo de Livros</h1>

            <input type="text" name="" id="" placeholder="Buscar Livros" className="books-search" onChange={(e) => setSearch(e.target.value)}/>

            <ul className="books-list">




                {books && books.length > 0 ? books.map((book) => (
                    <li key={book.id} className="book-item">
                        <p className="book-name">{book.title}</p>
                        <p><label>Autor:</label> {book.author}</p>
                        <p className="book-description"><label>Descrição:</label> {book.description ?? "Sem descrição"}</p>
                        <p><label>Categoria:</label> {book.category}</p>
                    </li>
                )) : (<p>Sem Livros para Listar</p>)}




            </ul>
        </div>
        
        
    )
}