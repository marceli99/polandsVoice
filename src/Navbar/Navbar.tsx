import React, {useState} from "react";
import './Navbar.css';
import Hamburger from 'hamburger-react'
import {Sidebar} from "../Sidebar/Sidebar";
import {Link} from "react-router-dom";

export function Navbar() {
    const [sidebarVisible, setSidebarVisible] = useState(false)

    return (
        <nav className='Navbar'>
            <div className='Content'>
                <Link className='Link' to='/'>
                    <h5 className='NavbarTitle'>POLAND'S VOICE</h5>
                </Link>
                <Hamburger toggled={sidebarVisible} toggle={setSidebarVisible} />
            </div>
            <Sidebar visible={sidebarVisible} changeVisibility={setSidebarVisible}/>
        </nav>
    );
}