import React from 'react';
import ErrorPage from './Common/errorpage/ErrorPage';
import RegisterNode from './Common/registernode/RegisterNode';


function ProtectedRegNode({ Profile, Component, Auth, Logout }) {

    return (
        <div>
            {(Auth === false && Component === 'RegisterNode') ? (<ErrorPage Logout={Logout}/>) : <RegisterNode Profile={Profile} Logout={Logout}/>}          
        </div>
        
    )

}

export default ProtectedRegNode;