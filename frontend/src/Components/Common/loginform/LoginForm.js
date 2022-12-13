import React, {useState} from 'react';
import logo2 from './../../Pics/k3s-logo.png';
import './../loginform/LoginForm.css';
import {Link} from 'react-router-dom';


function LoginForm({ Login, error }) {
    
    const [details, setDetails] = useState({username: "", password:""});

    const submitHandler = e => {
        e.preventDefault();
        Login(details);
    }


    return (
        <form onSubmit={submitHandler}>
            <div className='main'>    
                <div className='sub-main'>
                    <div>
                        <div className='new-logo'>
                            <img src={logo2} alt='mylogo' className='logo-css'/>
                        </div>
                        <div>
                            <h2>Login page</h2>
                            {(error !== "") ? ( <div className="error">{error}</div>) : "" }
                            <div className='form-container'>
                                <input type='text' name='username' placeholder='Username' className='input-label' onChange={e => setDetails({...details, username:e.target.value})} value={details.username} required/>                      
                            </div>
                            <div className='form-container'>
                                <input type='password' name='password' placeholder='Password' className='input-label' onChange={e => setDetails({...details, password:e.target.value})} value={details.password}required/>
                            </div>
                            <div>
                                <br/><button type='submit'>Login</button>
                            </div>
                            <p className='link-reg'> New user?
                                <Link className='link-to' to= '/register'>Sign up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        
        
    )
}

export default LoginForm;