import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../usermenu/UserMenu.css';

function UserMenu({ Logout }) {
    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();
        Logout();
    }

    return (
        <form onSubmit={submitHandler}>
            <div className='main'>
                <div className='sub-main-menu'>
                    <div className='content-menu'>
                    <h1>USER MENU</h1>
                    <div className='row'>
                        <div className='column'>
                            <h3>Register job</h3>
                            <p className='p-menu'>This request will give a K3S token to the user in order to successfully register a node in the cluster.</p>
                            <button className='button-menu' type='submit' onClick={() => navigate('/login')}>Register</button>
                            
                        </div>
                        <div className='column'>
                            <h3>Run job</h3>
                            <p className='p-menu'>This functionality will allow requesting resources to be able to run docker containers in the cluster.</p>
                            <button className='button-menu' type='submit' onClick={() => navigate('/login')}>Run</button>
                        </div>
                        <div className='column'>
                            <h3>Monitoring</h3>
                            <p className='p-menu'>Page to monitor services</p>
                            <button className='button-menu-monitor' type='submit' onClick={() => navigate('/login')}>Dashboard</button>
                        </div>
                    </div>
                    
                    
                    
                    </div>
                
                </div>
            </div>
            
        </form>
        
        
    )

}

export default UserMenu;