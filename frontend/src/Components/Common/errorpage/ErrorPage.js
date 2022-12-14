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
                <div className='sub-main-error'>
                    <div>
                        <h1 >You don't have enough permissions</h1>
                        <br/><br/><br/><br/><br/>
                        <button type='submit' onClick={() => navigate('/')}>Back to the home page</button>
                    </div>
                </div>  
            
            </div>
        </form>
    )

}

export default ErrorPage;