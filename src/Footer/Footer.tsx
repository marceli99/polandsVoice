import React from "react";
import './Footer.css';

export function Footer() {
    return (
        <footer className='Footer'>
            <div className='Media'>
                <h4 className='Footer-Title'>Media</h4>
                <a className='Footer-Text' href='#'>Twitter</a>
                <a className='Footer-Text' href='#'>Facebook</a>
            </div>
            <div className='Author'>
                <a className='Footer-Text' href='https://github.com/Marceli99' target='_blank'>Created by 🐺</a>
                <span className='Footer-Text'>lorem@ipsum.com</span>
            </div>
        </footer>
    );
}