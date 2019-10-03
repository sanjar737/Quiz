import React from 'react';
import cssClasses from './MenuToggle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'

export default function MenuToggle(props) {
    const classes = [cssClasses.menuToggle];
    if (props.isOpen) {
        classes.push(cssClasses.open)
    }

    return (
        <i  
            onClick={props.onToggle}
            className={classes.join(' ')}
        >
            {props.isOpen ? <FontAwesomeIcon icon={ faTimes } />: <FontAwesomeIcon icon={ faBars } />}
            
        </i>
        
    )
}