import { useState } from 'react';
import './register.css'
import api from '../../utils/api';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Navbar from "../../components/Navbar/Navbar";
import RegisterInput from '../../components/RegisterInput/RegisterInput';



export default function Register (){

    const [name, setName] = useState('');   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();

    async function handleRegister(e){
        e.preventDefault();

        try {

           
            const response = await api.post('/accounts', {
                name,
                email,
                password
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
        <div className="register-container">
            <Navbar back no></Navbar>
            <div className='register-content'>
                <h1>Registre-se <br/>para começar</h1>
                <form action="" className='register-form'>
                    <RegisterInput title="Nome" type="text" placeholder="Digite seu nome" onChange={setName}/>
                    <RegisterInput title="Email" type="email" placeholder="Digite seu email" onChange={setEmail}/>
                    <RegisterInput title="Senha" type="password" placeholder="Digite sua senha" onChange={setPassword}/> 
                    <button className='register-button' onClick={handleRegister}>Registrar</button>
                </form>
            </div>
        </div>
    )
}