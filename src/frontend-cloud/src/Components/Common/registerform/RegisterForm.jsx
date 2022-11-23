import React, {useState} from 'react';
import './../registerform/RegisterForm.css';
import lock from './../../Pics/lock.png';
import axios from 'axios';

function RegisterForm({/* Register*/ Navigation, error }) {
    const [details, setDetails] = useState({username: "", password:"", password2:""});
    const [message, setMessage] = useState(""); 
    const [path, setPath] = useState(""); 
    const [userActual, setUserActual] = useState("");

    /*const submitHandler = async (e) => {
        e.preventDefault();
        const user = { body: JSON.stringify({
            name: details.username,
            pword: details.password,
            pword2: details.password2,
        })};
        return axios.post("http://localhost:3000/api/register", user)
            .then(response =>{
                console.log(response);
                console.log(response.body);
                setPath('/dashboard');
                Navigation(path);
            })
            .catch(error => {
                console.log(error);
                console.log(error.body);
                setPath('/register');
                Navigation(path);
            });
    }*/

    const submitHandler = async (e) => {
        e.preventDefault();
    
        //Register(details);
        try {
            let res = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: details.username,
                    pword: details.password,
                    pword2: details.password2,
                }),
            });
            console.log(details.username);
            if(res.status === 200){
                  console.log("User registered succesfully!");
                  //setAuth(true);
                  //navigate('/dashboard');
                  setPath('/dashboard');
                  Navigation(path);
            }
            else {
                console.log("Error occurred while register");
                window.location.reload(false);
            }

            //setError("Passwords do not match");
            //setAuth(false);
          } catch(err){
              console.log(err);
          }
    }
/*
    function doRegister(){
        const user = { body: JSON.stringify({
            name: details.username,
            pword: details.password,
            pword2: details.password2,
        })};
        axios.post("http://localhost:3000/api/register", user)
            .then(response =>{
                console.log(response);
                console.log(response.body);
                setPath('/dashboard');
                Navigation(path);
            })
            .catch(error => {
                setMessage("todo mal");
                console.log(message);
                setPath('/register');
                Navigation(path);
            });
    }*/

    

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
                                <input type='text' name='username' placeholder='Username' className='input-label' onChange={e => setDetails({...details, username:e.target.value})} value={details.username}/>                      
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