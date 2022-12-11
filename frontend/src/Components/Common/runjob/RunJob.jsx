import React from 'react';
import './../runjob/RunJob.css';
import { useNavigate } from 'react-router-dom';

function RunJob({ Profile }) {
    const navigate = useNavigate();

    return (
        <form>
            <div className='main'>
                <div className='sub-main-menu'>
                    <div className='content-menu'>
                        <h1>RUN JOB</h1>
                        <div className='node-row'>
                            
                        </div>
                        <button className='button-node' type='submit' onClick={() => navigate('/dashboard')}>Back to Menu</button>
                    </div>
                </div>
            </div>
            
        </form>
        
        
    )

}

export default RunJob;