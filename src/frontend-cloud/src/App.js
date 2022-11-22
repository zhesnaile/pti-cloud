import React from 'react';
import {useState} from 'react';
import { Header } from './Components/Common/';
import LoginForm from './Components/Common/loginform/LoginForm.js';
import RegisterForm from './Components/Common/registerform/RegisterForm.jsx';
import ErrorPage from './Components/Common/errorpage/ErrorPage.js';
import ProtectedRoutes from './Components/ProtectedRoutes.jsx';
//import './App.css';

import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';



function App() {

  const adminUser = {
    username: "admin",
    password: "123"
  }
  const navigate = useNavigate();
  

  const [user, setUser] = useState({username:"", password:""});
  const [error, setError] = useState(""); //catch if details are correct
  const [auth, setAuth] = useState(false); 
  const [message, setMessage] = useState(""); 

  const Navigation = path => {
    if(path === '/dashboard'){
      setAuth(true);
      navigate('/dashboard');
    } 
  }

  const Login = details => {
    console.log(details);

    if(details.username === adminUser.username && details.password === adminUser.password){
      console.log("Logged in siuu");
      setUser({
        username: details.username,
        password: details.password
      })
      setAuth(true);
      navigate('/dashboard');
    }
    else{
      console.log("Credentials do not match");
      setError("Credentials do not match");
      setAuth(false);
    }
  }

  const Logout = () => {
    console.log("Logout");
    setUser({
      username: "",
      password: ""
    })
    setAuth(false);
    navigate('/login');
  }

  const Register = details => {
    console.log(details);
    if(details.username === "" || details.password === "" || details.password2 === ""){
      console.log("Fill all the blanks");
      setError("Fill all the blanks");
      setAuth(false);
    }
    else if(details.password === details.password2){
      console.log("User registered");
      setUser({
        username: details.username,
        password: details.password
      })
      setAuth(true);
      navigate('/dashboard');
    }
    else{
      console.log("Passwords do not match");
      setError("Passwords do not match");
      setAuth(false);
    }
  }

  /*const Register2 =  async (details) => {
    try {
      let res = await fetch("https://localhost:3000/api/register", {
          method: "POST",
          body: JSON.stringify({
              name: details.username,
              pword: details.password,
              pword2: details.password2,
          }),
      });
      let resJson = await res.json();
      if(res.status === 200){
            setMessage("User registered succesfully!");
            setAuth(true);
            navigate('/dashboard');
      }
      else setMessage("Error occurred while register");
      setError("Passwords do not match");
      setAuth(false);
    } catch(err){
        console.log(err);
    }
  }*/

  return (
      <div className="App">
        <Header />
        <Routes>
          <Route path='/login' element={<LoginForm Login={Login} error={error}/>}/>
          <Route path='/register' element={<RegisterForm Register={Navigation} error={error}/>}/>
          <Route path='/dashboard' element={<ProtectedRoutes Auth={auth} Logout={Logout}/>} />
          <Route path='*' element={<ErrorPage Logout={Logout}/>} />
        </Routes>
      </div>
  );
}

export default App;
