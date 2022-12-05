import React from 'react';
import './Navbar.css';
import upc_fib from '../../Pics/logo_fib.png';
import { Link } from 'react-router-dom';

function Navbar ({ Logout }) {

    const doLogout = () => {
        Logout();
    }

    return (
        <section className='navbar'>
            <Link to="/dashboard" className="navbar-item">Home</Link>
            <a href="https://docencia.ac.upc.es/FIB/grau/PTI/"className='navbar-item'>Projectes de TI</a>
            <Link onClick={doLogout} to="/" className='navbar-item'>Log out</Link>
            <section className='navbar-item'>
                <img alt='fib' className='fib-logo' src={upc_fib} />
            </section>
        </section>
        
    )
}

export default Navbar;