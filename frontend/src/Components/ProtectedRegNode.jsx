import React from 'react';
import ErrorPage from './Common/errorpage/ErrorPage';
import RegisterNode from './Common/registernode/RegisterNode';


function ProtectedRegNode({Component, Auth, Logout }) {

    return (
        <div>
            {(Auth === false && Component === 'RegisterNode') ? (<ErrorPage Logout={Logout}/>) : <RegisterNode Logout={Logout}/>}          
        </div>
        
    )

}

export default ProtectedRegNode;