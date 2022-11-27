import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../homepage/HomePage.css';


function HomePage({ go2Login, got2Register }) {
    const navigate = useNavigate();

    return (
            <div className='main'>
                <div className='sub-main'>
                    <div>
                        <button className='button-home' type='submit' onClick={() => navigate('/login')}>Login</button>
                        
                        <button className='button-home' type='submit' onClick={() => navigate('/register')}>Register</button>
                    </div>
                </div>
            </div>
    )
}

export default HomePage;