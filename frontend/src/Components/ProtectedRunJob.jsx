import React from 'react';
import ErrorPage from './Common/errorpage/ErrorPage';
import RunJob from './Common/runjob/RunJob';


function ProtectedRunJob({Component, Auth, Logout }) {
    return (
        <div>
            {(Auth === false && Component === 'RunJob') ? (<ErrorPage Logout={Logout}/>) : <RunJob />}         
        </div>
    )
}

export default ProtectedRunJob;