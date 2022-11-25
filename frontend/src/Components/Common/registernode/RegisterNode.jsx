import React from 'react';
import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import './../registernode/RegisterNode.css';

function RegisterNode({ Profile, Logout }) {
    //const navigate = useNavigate();
    const [K3S_flag, setK3S_flag] = useState(false);
    const [K3S_token, setK3S_token] = useState('');
    const [WG_flag, setWG_flag] = useState(false);
    const [WG_config, setWG_config] = useState('');


    /*const submitHandler = e => {
        e.preventDefault();
        Logout();
    }*/

    const getScript = async e => {
        //descarregar el script
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:3000/api/helloTest", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
        if (res.status === 200) console.log("Funciona");
        else console.log("No funciona encara");
        } catch (err){
            console.log(err);
        }
    }

    const handle_K3S = (event) => {
        setK3S_flag(event.target.value);
        setK3S_flag(!K3S_flag);
        //aqui s'hauria de cridar a la api que genera el token de k3s i fer:
        
        //setK3S_token(num);
    }

    const handle_WG = async (event) => {
        setWG_flag(event.target.value);
        setWG_flag(!WG_flag);
        //aqui s'hauria de cridar a la api que genera el nom de configuracio i fer:
        try{
            let res = await fetch("http://localhost:3000/api/wgtest", {
              method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: Profile,
                }),
            });
            if(res.status === 200){
                while(res.body.wg_config === '');
                try{
                    const config = await res.body.wg_cofig;
                    console.log(config);
                    setWG_config(config);
                } catch(err){
                    console.log("setWG error");
                }
            }
            if(res.status !== 200){
                console.log("Error api");
            }
          } catch(err){
            console.log(err);
          }
    }

    const K3S_change = event => {
        setK3S_token(event.target.value);
    }
    const WG_change = event => {
        setWG_config(event.target.value);
    }

    return (
        <form onSubmit={getScript}>
            <div className='main'>
                <div className='sub-main-menu'>
                    <div className='content-menu'>
                        <h1>REGISTER NODE</h1>
                        <div className='node-row'>
                            <h3>Follow the instructions below to be able to register a node:</h3>
                            <div>
                                <h4> &gt; Manually download the installer.</h4>
                                <button type='submit' className='classic-button'>Download</button>
                                <h4> &gt; To run this script, you must follow the next steps on your terminal:</h4>
                                <p className='h4-node'>1. Enter the directory where you have downloaded the script</p>
                                <p className='h4-node'>2. Modify the file permissions: chmod +x ./_myscript_.sh</p>
                                <p className='h4-node'>3. Run the script: ./_myscript_.sh</p>
                            </div>
                            <div>
                                <h3>The following steps are optional:</h3> 
                                <label> &gt; Get the hidden K3S token
                                    <input className='checkbox-node' type="checkbox" onChange={handle_K3S} checked={K3S_flag}/>
                                    <input className='input-node' onChange={K3S_change} value={K3S_flag ? K3S_token || '' : '?'}/>                                    
                                </label> 
                                <br/>
                                <label> &gt; Get the hidden Wireguard config
                                    <input className='checkbox-node' type="checkbox" onChange={handle_WG} checked={WG_flag}/>
                                    <input className='input-node' onChange={WG_change} value={WG_flag ? WG_config || '' : '?'} />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </form>
        
        
    )

}

export default RegisterNode;