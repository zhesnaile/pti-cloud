import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../errorpage/ErrorPage.css';

function ErrorPage( Logout ) {
    
    const navigate = useNavigate();

    const submitHandler = e => {
            e.preventDefault();
            Logout();
    }
    
    return (
        <form onSubmit={submitHandler}>
            <div className='main'>
                <div className='sub-main'>
                    <div>
                        <h1 >You don't have enough permissions</h1>
                        <button type='submit' onClick={() => navigate('/login')}>Back to login page</button>
                    </div>
                </div>  
            
            </div>
        </form>
    )

}

export default ErrorPage;