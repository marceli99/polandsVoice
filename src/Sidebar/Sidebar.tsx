import React, {useState} from "react";
import './Sidebar.css';
import {Link} from "react-router-dom";

export function Sidebar({visible, changeVisibility}: {visible: boolean, changeVisibility: any}) {
    const toggleSidebar = () => {
        let sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('Hidden');
        }
    };

    return (
        <aside id='sidebar' className={`Sidebar ${visible ? '' : 'Hidden'}`}>
            <div className='Background'/>
            <div className='Content'>
                <div className='Margin'>
                    <h5>POLAND'S VOICE</h5>
                    <div className='Links Main'>
                        <Link onClick={_ => changeVisibility()} to='/'>Main page</Link>
                        <Link onClick={_ => changeVisibility()} to='/polls'>Election polls</Link>
                        <a className='Disabled' href='#'>Other polls</a>
                        <a className='Disabled' href='#'>Mandates calculator</a>
                    </div>
                    <span>Incoming elections</span>
                    <div className='Links'>
                        <a className='Disabled' href='#'>2023 General Elections</a>
                        <a className='Disabled' href='#'>2024 Local Elections</a>
                        <a className='Disabled' href='#'>2025 Presidential Elections</a>
                    </div>
                    <span>Past elections</span>
                    <div className='Links'>
                        <a className='Disabled' href='#'>2020 Presidential Elections</a>
                        <a className='Disabled' href='#'>2019 General Elections</a>
                        <a className='Disabled' href='#'>2020 Presidential Elections</a>
                    </div>
                </div>
            </div>
        </aside>
    );
}