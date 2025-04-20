import { useState } from 'react';
import './register-book.css'
import api from '../../utils/api';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Navbar from "../../components/Navbar/Navbar";
import Cookies from 'js-cookie';


export default function RegisterBook (){

    const [title, setTitle] = useState('');   
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [publishedOn, setPublishedOn] = useState('');
    const [imgFile, setImgFile] = useState('');


    let navigate = useNavigate();

    async function handleRegister(e){
        e.preventDefault();

        let finalCoverImg;
        
        if(imgFile){
            try {
                finalCoverImg = await handleUpload(imgFile);
            } catch (error) {
                console.error("Erro ao enviar imagem!");
            }
        }


        try {

            const response = await api.post('/books', {
                title,
                author,
                category,
                description,
                published_on: publishedOn,
                cover_image: finalCoverImg
,
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            })


            Swal.fire({
                title: 'Registro efetuado com sucesso!',
                icon: 'success',
                customClass: {
                    title: 'swal-title',
                    container: 'swal-title'
                }
            })

            navigate('/home');

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

    async function handleUpload(file){

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'front-biblioteca');

        const response = await fetch('https://api.cloudinary.com/v1_1/dn5skaovf/image/upload/', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        
        return resizeImg(data.secure_url);

    }

    function resizeImg(url, largura = 300, altura = 400) {
        const editedURL = url.replace('/upload/', `/upload/w_${largura},h_${altura},c_fill/`);
        return editedURL;
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
                    <input type="file" className='file' accept="image/*" onChange={e => setImgFile(e.target.files[0])}/>
                    <button className='register-button' onClick={handleRegister}>Registrar</button>
                </form>
            </div>
        </div>
        </>
    )
}