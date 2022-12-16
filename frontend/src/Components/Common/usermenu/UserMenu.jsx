import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../usermenu/UserMenu.css';

function UserMenu() {
    const navigate = useNavigate();

    return (
        <form>
            <div className='main'>
                <div className='sub-main-menu'>
                    <div className='content-menu'>
                        <h1>USER MENU</h1>
                        <div className='row'>
                            <div className='column-menu'>
                                <h3 className='title-cols'>Register node</h3>
                                <p className='p-menu'>This request will give a K3S token to the user in order to successfully register a node in the cluster.</p>
                                <button className='button-menu' type='submit' onClick={() => navigate('/registerusernode')}>Register</button>
                            </div>
                            <div className='column-menu'>
                                <h3 className='title-cols'>Run job</h3>
                                <p className='p-menu'>This functionality will allow requesting resources to be able to run docker containers in the cluster.</p>
                                <button className='button-menu' type='submit' onClick={() => navigate('/runjob')}>Run</button>
                            </div>
                            {/*<div className='column-menu'>
                                <h3>Monitoring</h3>
                                <p className='p-menu'>Page to monitor services</p>
                                <br/><br/>
                                <button className='button-menu' type='submit' onClick={() => navigate('/login')}>Dashboard</button>
    </div>*/}
                        </div>                  
                    </div>
                </div>
            </div> 
        </form>
    )

}

export default UserMenu;