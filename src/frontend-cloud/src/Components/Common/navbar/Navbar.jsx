import React from 'react';
import './Navbar.css';
import upc_fib from '../../Pics/logo_fib.png'

function Navbar () {
    return (
        <section className='navbar'>
            <a href="/login" className="navbar-item">Home</a>
            <a href="https://docencia.ac.upc.es/FIB/grau/PTI/"className='navbar-item'> Projectes de TI</a>
            <section className='navbar-item'>
                <img alt='fib' className='fib-logo' src={upc_fib} />
            </section>
        </section>
        
    )
}

export default Navbar;