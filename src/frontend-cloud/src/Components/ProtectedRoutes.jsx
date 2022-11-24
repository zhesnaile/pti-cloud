import React from 'react';
import ErrorPage from './Common/errorpage/ErrorPage';
import UserMenu from '../Components/Common/usermenu/UserMenu';


function ProtectedRoutes({ Auth, Logout }) {

    return (
        <div>
            {(Auth === false) ? (<ErrorPage Logout={Logout}/>) : <UserMenu Logout={Logout}/>}
        </div>
        
    )

}

export default ProtectedRoutes;