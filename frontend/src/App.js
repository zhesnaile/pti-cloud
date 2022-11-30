import React from 'react';
import {useState} from 'react';
import { Header } from './Components/Common/';
import LoginForm from './Components/Common/loginform/LoginForm.js';
import RegisterForm from './Components/Common/registerform/RegisterForm.jsx';
import ErrorPage from './Components/Common/errorpage/ErrorPage.js';
import ProtectedRoutes from './Components/ProtectedRoutes.jsx';
import ProtectedRegNode from './Components/ProtectedRegNode.jsx';
import HomePage from './Components/Common/homepage/HomePage.jsx';



import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';



function App() {

  const navigate = useNavigate();
  const [user, setUser] = useState({username:"", password:""});
  const [error, setError] = useState(""); //catch if details are correct
  const [auth, setAuth] = useState(false); 


  const Login = async details => {
    console.log(details);

    try {
      const ddd = window.location.href;
      console.log(ddd);
      let res = await fetch("http://localhost:3000/api/loginUser", {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              name: details.username,
              pword: details.password,
          }),
      });
      console.log(details.username);
      if(res.status === 200){
            setUser({
              username: details.username,
              password: details.password
            })
            console.log("User registered succesfully!");
            setAuth(true);
            navigate('/dashboard');
      }
      else {
          console.log("Error occurred while login");
          setError("Wrong credentials");
          setAuth(false);
      }
    } catch(err){
        console.log(err);
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

  const Register = async details => {
    console.log(details);

    try {
      let res = await fetch("http://localhost:3000/api/registerUser", {
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
      if(res.status === 200){
            setUser({
              username: details.username,
              password: details.password
            })
            console.log("User registered succesfully!");
            setAuth(true);
            navigate('/dashboard');
      }
      else {
          console.log("Error occurred while register");
          setError("Wrong credentials");
          setAuth(false);
      }
    } catch(err){
        console.log(err);
    }
  }

  const go2Login  = async () => {
    navigate('/login');
  }

  const go2Register  = async () => {
    navigate('/register');
  }

  return (
      <div className="App">
        <Header profile={user.username}/>
        <Routes>
          <Route path='/' element={<HomePage Login={go2Login} Register={go2Register}/>}/>
          <Route path='/login' element={<LoginForm Login={Login} error={error}/>}/>
          <Route path='/register' element={<RegisterForm Register={Register} error={error}/>}/>
          <Route path='/dashboard' element={<ProtectedRoutes Component={'UserMenu'} Auth={auth} Logout={Logout}/>} />
          <Route path='/registerusernode' element={<ProtectedRegNode Component={'RegisterNode'} Profile={user.username} Auth={auth} Logout={Logout}/>} />
          <Route path='*' element={<ErrorPage Logout={Logout}/>} />
        </Routes>
      </div>
  );
}

export default App;
