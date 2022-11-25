import React from 'react';
import ErrorPage from './Common/errorpage/ErrorPage';
import UserMenu from './Common/usermenu/UserMenu';


function ProtectedRoutes({Component, Auth, Logout }) {

    return (
        <div>
            {(Auth === false && Component === 'UserMenu') ? (<ErrorPage Logout={Logout}/>) : <UserMenu Logout={Logout}/>}         
        </div>
        
    )

}

export default ProtectedRoutes;