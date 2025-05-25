import './li-book.css';
import { FaHeart } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function LiBook({book, favorites, toggleFavorite, fav=false, favId, isSuperAdmin=false, onDelete}) {

    const nav = useNavigate();

    return (
        <li className="book-item">
            <img src={book.cover_image} alt="capa do livro" className="book-img" />
            <div className="div-item">
                <p className="book-name">{book.title}</p>
                <p><label>Autor:</label> {book.author}</p>
                <p><label>Categoria:</label> {book.category}</p>
                <p className="book-description"><label>Descrição:</label> {book.description ?? "Sem descrição"}</p>

                <div className="div-book">
                    <button className="btn-book" onClick={() => nav(`/book-info/${book.id}`)}>
                        Sobre
                    </button>
                    {isSuperAdmin ? (
                        <>
                            <button className='btn-book' onClick={() => nav(`/update-book/${book.id}`)}>
                                Alterar
                            </button>

                            <button className='btn-book' onClick={() => onDelete(book.id)}>
                                Deletar
                            </button>
                        </>
                    ) : null}

                </div>
                
            </div>

            {fav ? (
                <FaRegWindowClose className="remove-icon" onClick={() => toggleFavorite(favId)} />
            ) : (
                <FaHeart 
                    className={favorites.some(favorite => favorite.id === book.id) ? "liked-icon active" : "liked-icon inactive"} 
                    onClick={() => toggleFavorite(book.id)}
                />
            )}        
        </li>
    )
}