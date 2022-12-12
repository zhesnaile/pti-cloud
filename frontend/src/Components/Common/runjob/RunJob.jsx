import React from 'react';
import './../runjob/RunJob.css';
import { useNavigate } from 'react-router-dom';


function RunJob({ Profile }) {
    const navigate = useNavigate();

    return (
            <div className='main'>
                <div className='sub-main-menu'>
                    <div className='content-menu'>
                        <h1>RUN JOB</h1>
                        <div className='node-row'>
                            <form action='/api/uploadYAML' method='POST' Content-type='multipart/form-data'>
                            <input type='file' name='file2upload'/>
                                <div>
                                    <button className='button-node' type='submit'>Submit</button>
                                </div> 
                            </form>   
                        </div>
                        <button className='button-node' type='submit' onClick={() => navigate('/dashboard')}>Back to Menu</button>
                    </div>
                </div>
            </div>
    )

}

export default RunJob;