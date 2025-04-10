import { useState } from 'react';
import './register-book.css'
import api from '../../utils/api';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Navbar from "../../components/Navbar/Navbar";


export default function RegisterBook (){

    const [title, setTitle] = useState('');   
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [publishedOn, setPublishedOn] = useState('');

    let navigate = useNavigate();

    async function handleRegister(e){
        e.preventDefault();

        try {

            const response = await api.post('/accounts', {
                title,
                author,
                category,
                description,
                published_on: publishedOn
            })

            Swal.fire({
                title: 'Registro efetuado com sucesso!',
                icon: 'success',
                customClass: {
                    title: 'swal-title',
                    container: 'swal-title'
                }
            })

            navigate('/');

        } catch (error) {
            Swal.fire({
                title: 'Erro ao realizar o cadastro',
                text: 'Revise as informações informadas e tente novamente.',
                icon: 'error',
                customClass: {
                    title: 'swal-title',
                    container: 'swal-title'
                }
            })
        }
    }
    

    return (
        <>
        <Navbar back></Navbar>
        <div className="register-container">
            
            <div className='register-book-content'>
                <h1>Cadastrar Livro</h1>
                <form action="" className='register-form'>
                    <label htmlFor="">Título:</label>
                    <input type="text" className='register-input' placeholder="Digite o título do livro" onChange={e => setTitle(e.target.value)}/>
                    <label htmlFor="">Autor:</label>
                    <input type="text" className='register-input' placeholder="Digite o nome do autor" onChange={e => setAuthor(e.target.value)}/>
                    <label htmlFor="">Categoria:</label>
                    <input type="text" className='register-input' placeholder="Digite a categoria" onChange={e => setCategory(e.target.value)}/> 
                    <label htmlFor="">Descrição:</label>
                    <input type="text" className='register-input' placeholder="Digite a descrição" onChange={e => setDescription(e.target.value)}/>
                    <label htmlFor="">Data de Publicação:</label>
                    <input type="date" className='register-input' onChange={e => setPublishedOn(e.target.value)}/>
                    <label htmlFor="">Capa do Livro:</label>
                    <input type="file" className='file' accept="image/*" onChange={e => setCoverImage(e.target.files[0])}/>
                    <button className='register-button' onClick={handleRegister}>Registrar</button>
                </form>
            </div>
        </div>
        </>
    )
}