import './navbar.css'
import { HiArrowSmLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Navbar ({ children, back, no }){

    
    const navigate = useNavigate();

    let noItems = '';

    if (no){
        noItems = 'no-items';
    }


    async function exit(){
        

        const result = await Swal.fire({
            title: "Você deseja realmente sair?",
            showCancelButton: true,
            confirmButtonText: "Sim",
            customClass: {
                title: "custom-title"
            }
        });

       if (result.isConfirmed){
            navigate('/');
       } 
    }


    return(
        <nav className='navbar'>  
            <div className='navbar-item'>
                
                { 
                    back ? <HiArrowSmLeft className='back-icon' onClick={() => navigate(-1)}/> : false
                }  

            </div>

            <div className='navbar-item'>
                <h1 className='home-title'>{children}</h1>

            </div>

            <div className={`navbar-item ${noItems}`}>
                <ul className='nav-options'>
                    <li><a href="#/home">Home</a></li>
                    <li><a href="#/books">Livros</a></li>
                    <li><a href="#/favorites">Favoritos</a></li>
                    <li><a style={{cursor: 'pointer'}} onClick={() => exit()}>Sair</a></li>
                </ul>

            </div>
        
        </nav>
    )

}