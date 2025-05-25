import { useEffect, useState } from 'react';
import './register-book.css'
import api from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from "../../components/Navbar/Navbar";
import Cookies from 'js-cookie';
import RegisterInput from '../../components/RegisterInput/RegisterInput';

export default function RegisterBook (){

    const [title, setTitle] = useState('');   
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [publishedOn, setPublishedOn] = useState('');
    const [imgFile, setImgFile] = useState('');


    let navigate = useNavigate();

    const { id } = useParams();

    async function getBook() {
        if (id){
            try {
                const response = await api.get(`/books/${id}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    }
                });
    
                if (response && response.status === 200) {
                    setTitle(response.data.book.title || '');
                    setAuthor(response.data.book.author || '');
                    setCategory(response.data.book.category || '');
                    setDescription(response.data.book.description || '');
                    setPublishedOn(response.data.book.published_on?.slice(0, 10) || '');
                } 
            } catch (error) {
                alert("Não foi possível buscar as informações do livro!", error);
            }
        }
    }

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

    async function handleUpdate(e){
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

            const response = await api.put(`/books/${id}`, {
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

            if(response.status === 201){
                Swal.fire({
                    title: 'Livro atualizado com sucesso!',
                    icon: 'success',
                    customClass: {
                        title: 'swal-title',
                        container: 'swal-title'
                    }
                })
            }

            navigate('/books');

        } catch (error) {
            Swal.fire({
                title: 'Erro ao atualizar o livro',
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

    useEffect(() => {
        getBook();
    }, [])
    
    
    return (
        <>
        <Navbar back></Navbar>
        <div className="register-container">
            <div className='register-book-content'>
                <h1>Cadastrar Livro</h1>
                <form action="" className='register-form'>
                    <RegisterInput title="Título" type="text" placeholder="Digite o título do livro" value={title} onChange={setTitle}/>
                    <RegisterInput title="Autor" type="text" placeholder="Digite o nome do autor" value={author} onChange={setAuthor}/>
                    <RegisterInput title="Categoria" type="text" placeholder="Digite a categoria" value={category} onChange={setCategory}/>
                    <RegisterInput title="Descrição" type="text" placeholder="Digite a descrição" value={description} onChange={setDescription}/>
                    <RegisterInput title="Data de Publicação" type="date" placeholder="Digite a data de publicação" value={publishedOn} onChange={setPublishedOn}/>
                    <label htmlFor="">Capa do Livro:</label>
                    <input type="file" className='file' accept="image/*" onChange={e => setImgFile(e.target.files[0])}/>
                    <button className='register-button' onClick={id ? handleUpdate : handleRegister}>{id ? 'Atualizar' : 'Registrar'}</button>
                </form>
            </div>
        </div>
        </>
    )
}