import React from 'react';
import  './NavHead.css';

const links = [
    {
        url: '/',
        title: 'Home'
    },
    {
        url: 'sale',
        title: 'Hale'
    },
    {
        url: 'handbags',
        title: 'Handbags'
    },
    {
        url: 'contactUs',
        title: 'Contact us'
    }
]

const domLinks = links.map( (element, index) => {
    return   <li key={index}><a href={element.url}>{element.title}</a></li>
})

export default function NavHead () {
    return (
        <nav>
            <ul className='container'>
                {domLinks}
            </ul>
        </nav>
    )
}
