import React from 'react';
import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import './../registernode/RegisterNode.css';

function UserMenu({ Logout }) {
    //const navigate = useNavigate();
    const [K3S_flag, setK3S_flag] = useState(false);
    const [K3S_token, setK3S_token] = useState('');
    const [WG_flag, setWG_flag] = useState(false);
    const [WG_config, setWG_config] = useState('');


    const submitHandler = e => {
        e.preventDefault();
        Logout();
    }

    const getScript = e => {
        //descarregar el script
    }

    const handle_K3S = (event) => {
        setK3S_flag(event.target.value);
        setK3S_flag(!K3S_flag);
        //aqui s'hauria de cridar a la api que genera el token de k3s i fer:
        //setK3S_token(num);
    }

    const handle_WG = (event) => {
        setWG_flag(event.target.value);
        setWG_flag(!WG_flag);
        //aqui s'hauria de cridar a la api que genera el nom de configuracio i fer:
        //setWG_config(num);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className='main'>
                <div className='sub-main-menu'>
                    <div className='content-menu'>
                        <h1>REGISTER NODE</h1>
                        <div className='node-row'>
                            <h3>Follow the instructions below to be able to register a node:</h3>
                            <div>
                                <h4> &gt; Manually download the installer.</h4>
                                <button className='classic-button' onClick={() => getScript()}>Download</button>
                                <h4> &gt; To run this script, you must follow the next steps on your terminal:</h4>
                                <p className='h4-node'>1. Enter the directory where you have downloaded the script</p>
                                <p className='h4-node'>2. Modify the file permissions: chmod +x ./_myscript_.sh</p>
                                <p className='h4-node'>3. Run the script: ./_myscript_sh</p>
                            </div>
                            <div>
                                <h3>The following steps are optional:</h3> 
                                <label> &gt; Get the hidden K3S token
                                    <input className='checkbox-node' type="checkbox" onClick={handle_K3S} checken={K3S_flag}/>
                                    <input className='input-node' value={K3S_flag ? K3S_token : '?'}/>                                    
                                </label> 
                                <br/>
                                <label> &gt; Get the hidden Wireguard config
                                    <input className='checkbox-node' type="checkbox" onClick={handle_WG} checken={WG_flag}/>
                                    <input className='input-node' value={WG_flag ? WG_config : '?'}/>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </form>
        
        
    )

}

export default UserMenu;