import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../homepage/HomePage.css';
import logo from "./../../Pics/kfc-logo.png";


function HomePage() {
    const navigate = useNavigate();

    return (
            <div className='main'>
                <div className='sub-main'>
                    <div>
                        <img src={logo} alt='mylogo' className='kfc-logo'/>   
                        <h1>Home Page</h1>                    
                        <button className='button-home' type='submit' onClick={() => navigate('/login')}>Login</button>
                        
                        <button className='button-home' type='submit' onClick={() => navigate('/register')}>Register</button>
                    </div>
                </div>
            </div>
    )
}

export default HomePage;