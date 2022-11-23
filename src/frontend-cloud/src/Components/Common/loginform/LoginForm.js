import React, {useState} from 'react';
import logo from './../../Pics/logo_proj.png';
import './../loginform/LoginForm.css';


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

                        <div className='logo'>
                            <div className='logo-container'>
                                <img src={logo} alt='mylogo' className='logo-project'/>
                            </div>
                        </div>

                        <div>
                            <h2>Login page</h2>
                            {(error !== "") ? ( <div className="error">{error}</div>) : "" }
                            <div className='form-container'>
                                <input type='text' name='username' placeholder='Username' className='input-label' onChange={e => setDetails({...details, username:e.target.value})} value={details.username}/>                      
                            </div>
                            <div className='form-container'>
                                <input type='password' name='password' placeholder='Password' className='input-label' onChange={e => setDetails({...details, password:e.target.value})} value={details.password}/>
                            </div>
                            <div className='login-button'>
                                <button type='submit'>Login</button>
                            </div>
                            <p className='link-reg'> New user?
                                <a href='/register'>Sign up</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default LoginForm;