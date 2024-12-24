import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './login.css';
import api from '../../utils/api';
import Swal from 'sweetalert2';


export default function Login (){


    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    let navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('/login', {
                email: email,
                senha: password 
            })

            const token = response.data.token;
            Cookies.set('token', token, {
                expires: 0.5,
                secure: true,
                sameSite: 'Strict',
            });

            navigate('/home');
            
            
        } catch (error) {
            Swal.fire({
                title: 'Erro ao logar',
                text: 'Email e/ou senha incorretos! Tente novamente.',
                icon: 'error',
                customClass: {
                    title: 'swal-title',
                    container: 'swal-title'
                }
            })

        }
    }

    async function handleToRegister(e){
        e.preventDefault();

        try {
            navigate('/register');
        } catch (error) {
            alert("Erro:" + error);
        }
    }
    
    return(   
        <div className='login'>
           
            <div className="login-container">
            

                <h1 className='login-title'>Biblioteca Virtual v1.0</h1>
                <div className='login-content'>
                    <div className='login-form'>
                        <h1 className='login-title'>Faça seu login</h1>
                        <form>
                            <div className='login-inputs'>
                                <input type="email" className='login-input' placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                                <input type="password" className='login-input' placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className='login-buttons'>
                                <button onClick={handleToRegister}>Register</button>
                                <button onClick={handleLogin}>Login</button>
                            </div>

                        </form>
                    </div>

                    <div className='login-logo'>
                        <img src="/src/assets/login-img.png"/>
                    </div>
                </div>
            </div>
        </div>
            
    
    )
}