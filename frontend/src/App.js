import React from 'react';
import {useState} from 'react';
import { Header } from './Components/Common/';
import LoginForm from './Components/Common/loginform/LoginForm.js';
import RegisterForm from './Components/Common/registerform/RegisterForm.jsx';
import ErrorPage from './Components/Common/errorpage/ErrorPage.js';
import ProtectedRoutes from './Components/ProtectedRoutes.jsx';
import ProtectedRegNode from './Components/ProtectedRegNode.jsx';
//import RegisterNode from './Components/Common/registernode/RegisterNode.jsx';


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
      let res = await fetch("http://localhost:3000/api/login", {
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



  return (
      <div className="App">
        <Header profile={user.username}/>
        <Routes>
          <Route path='/login' element={<LoginForm Login={Login} error={error}/>}/>
          <Route path='/register' element={<RegisterForm Register={Register} error={error}/>}/>
          <Route path='/dashboard' element={<ProtectedRoutes Component={'UserMenu'} Auth={auth} Logout={Logout}/>} />
          <Route path='/registernode' element={<ProtectedRegNode Component={'RegisterNode'} Auth={auth} Logout={Logout}/>} />
          <Route path='*' element={<ErrorPage Logout={Logout}/>} />
        </Routes>
      </div>
  );
}

export default App;
