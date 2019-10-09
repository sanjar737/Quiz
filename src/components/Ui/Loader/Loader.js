import React from 'react';
import cssClasses from './Loader.module.css';

export default function Loader() {
    return (
        <div className={cssClasses.center}>
            <div className={cssClasses.loader}>
                <div />
                <div />
            </div>
        </div>
    )
}