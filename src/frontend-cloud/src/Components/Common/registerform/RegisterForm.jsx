import React, {useState} from 'react';
import './../registerform/RegisterForm.css';
import lock from './../../Pics/lock.png';


function RegisterForm({ Register, error }) {
    const [details, setDetails] = useState({username: "", password:"", password2:""});

    const submitHandler = e => {
        e.preventDefault();

        Register(details);
    }

    

    return (
        <form onSubmit={submitHandler}>
            <div className='main'>
                <div className='sub-main'>
                    <div>
                        <div className='logo'>                 
                            <img src={lock} alt='lock' className='lock-logo'/>                          
                        </div>

                        <div>
                            <h2>Register page</h2>
                            {(error !== "") ? ( <div className="error">{error}</div>) : "" }
                            <div className='form-container'>
                                <input type='email' name='email' placeholder='Email Address' className='input-label' onChange={e => setDetails({...details, username:e.target.value})} value={details.username}/>                      
                            </div>
                            <div className='form-container'>
                                <input type='password' name='password' placeholder='Password' className='input-label' onChange={e => setDetails({...details, password:e.target.value})} value={details.password}/>                      
                            </div>
                            <div classname='second-input'>
                                <input type='password' name='password2' placeholder='Repeat Password' className='input-label' onChange={e => setDetails({...details, password2:e.target.value})} value={details.password2}/>
                            </div>
                            <div className='login-button'>
                                <button type='submit'>Sign up</button>
                            </div>
                            <p className='link-reg'> Already a member?
                                <a href='/login'>Login</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default RegisterForm;