import React from 'react';
import cssClasses from './Button.module.css';

export default function Button (props) {
    return (
        <button
            className={`${cssClasses.button} ${cssClasses[props.type]}`}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}