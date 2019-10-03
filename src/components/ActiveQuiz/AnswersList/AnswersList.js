import React from 'react';
import cssClasses from './AnswersList.module.css';
import AnswerItem from './AnswerItem/AnswerItem';

export default function AnswersList(props) {
    const answersItems = props.answers.map((answer, index) => {
        return  <AnswerItem 
                    answer={answer} 
                    key={index}
                    onAnswerClick={props.onAnswerClick}
                    state={props.state ? props.state[answer.id] : null}
                />
    })
    return (
            <ul className={cssClasses.answersList}>
                {answersItems}
            </ul>
    )
}