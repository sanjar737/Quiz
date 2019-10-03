import React from 'react';
import cssClasses from './Backdrop.module.css';

export default function Backdrop(props) {
    return (
        <div
            className={cssClasses.backdrop}
            onClick={props.onClick}
        >
            
        </div>
    )
}