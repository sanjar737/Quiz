import React from 'react';
import cssClasses from './AnswerItem.module.css';

export default function AnswerItem(props) {
    const onAnswerClick = function () {
        props.onAnswerClick(props.answer.id)
    }

    return (
            <li 
                onClick={onAnswerClick}
                className={`${cssClasses.answerItem} ${cssClasses[props.state]}`}
            >
                {props.answer.text}
            </li>
    )
}