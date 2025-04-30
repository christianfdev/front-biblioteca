import { useEffect, useState } from "react";
import './book-info.css';
import api from "../../utils/api";
import Cookies from 'js-cookie';
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function BookInfo() {

    const [book, setBook] = useState([]);
    
    const { id } = useParams();

    async function getBook() {
        try {
            const response = await api.get(`/books/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });

            if (response && response.status === 200) {
                setBook(response.data.book);
            }
    
        } catch (error) {
            alert("Não foi possível buscar as informações do livro!", error);
        }
    }

    useEffect(() => {
        getBook();
    }, []);


    return (
        <div className="info-container">

            <Navbar back>Informações do Livro</Navbar>

            <div className="info-background">
                <img src={book.cover_image} alt="capa do livro" className="info-book-img" />

                <div className="info-content">
                    <p className="info-book-name">{book.title}</p>
                    <p><label>Autor:</label> {book.author}</p>
                    <p><label>Categoria:</label> {book.category}</p>
                    <p className="book-description"><label>Descrição:</label> {book.description ?? "Sem descrição"}</p>
                    

                    <div className="info-buttons">
                        <button className="btn-buy">
                            Comprar
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}