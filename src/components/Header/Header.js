import React from 'react';
import NavHead from './NavHead/NavHead';
import './Header.css';

export default function Header() {
    return (
        <header>
            <div className='d-flex justify-content-between container align-items-center'>
                <div className='logo'>Aditii</div>
                <input type='text' name='search' id='search' />
                <a>Signin</a>
            </div>
            <NavHead></NavHead>
        </header>
    )
}
