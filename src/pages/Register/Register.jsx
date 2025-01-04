import { useState } from 'react';
import './register.css'
import api from '../../utils/api';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';


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
            <div className='register-content'>
                <h1>Registre-se para começar</h1>
                <form action="" className='register-form'>
                    <label htmlFor="">Nome:</label>
                    <input type="text" className='register-input' name="" id="" placeholder="Digite seu nome" onChange={e => setName(e.target.value)}/>
                    <label htmlFor="">E-mail:</label>
                    <input type="text" className='register-input' placeholder="Digite seu email" onChange={e => setEmail(e.target.value)}/>
                    <label htmlFor="">Password:</label>
                    <input type="password" className='register-input' placeholder="Digite sua senha" onChange={e => setPassword(e.target.value)}/> 
                    <button className='register-button' onClick={handleRegister}>Registrar</button>
                </form>
            </div>
        </div>
    )
}