import React from 'react';
import { Navbar } from '../../Common';
import './Header.css';


function Header ({ logout }) {
    return (
        <section className='header'>
            <section className='header-top'>
                <section className='header-top_navbar'>
                    <section className='header-top_navigation'>
                        <Navbar logout={logout}/>
                    </section>              
                </section>  
            </section>
        </section>
    )
}

export default Header;