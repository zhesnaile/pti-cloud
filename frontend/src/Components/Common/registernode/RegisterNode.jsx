import React from 'react';
import { useState } from 'react';
import './../registernode/RegisterNode.css';
import { useNavigate } from 'react-router-dom';

function RegisterNode({ Profile }) {
    const [K3S_flag, setK3S_flag] = useState(false);
    const [K3S_token, setK3S_token] = useState('');
    const navigate = useNavigate();

    const handle_K3S = async (event) => {
        setK3S_flag(event.target.value);
        setK3S_flag(!K3S_flag);
        try{
            let res = await fetch("/api/getK3Stoken", {
              method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: Profile,
                }),
            });
            let data = await res.json();
            console.log(data);
            setK3S_token(data.k3s_name);
          } catch(err){
            console.log(err);
          }
    }

    const K3S_change = event => {
        setK3S_token(event.target.value);
    }

    return (
        <form>
            <div className='main'>
                
                <div className='sub-main-menu'>
                    
                    <div className='content-menu'>
                        <h1>REGISTER NODE</h1>
                        <div className='node-row'>
                            <h3>Follow the instructions below to be able to register a node:</h3>
                            <div>
                                <h4> &gt; Manually download the installer.</h4>
                                <a href='/api/getscript'>Download</a>
                                <h4> &gt; To run this script, you must follow the next steps on your terminal:</h4>
                                <p className='h4-node'>1. Enter the directory where you have downloaded the script</p>
                                <p className='h4-node'>2. Modify the file permissions: chmod +x ./installation-client.sh</p>
                                <p className='h4-node'>3. Run the script: ./installation-client.sh</p>
                            </div>
                            <div>
                                <h3>The following steps are optional (after installation):</h3> 
                                <label> &gt; Get the hidden K3S token
                                    <input className='checkbox-node' type="checkbox" onChange={handle_K3S} checked={K3S_flag}/>
                                    <input className='input-node' onChange={K3S_change} value={K3S_flag ? K3S_token || '' : '?'} readOnly/>                                    
                                </label>  
                            </div>
                            
                        </div>
                        <button className='button-node' type='submit' onClick={() => navigate('/dashboard')}>Back to Menu</button>
                    </div>
                </div>
            </div>
            
        </form>
        
        
    )

}

export default RegisterNode;