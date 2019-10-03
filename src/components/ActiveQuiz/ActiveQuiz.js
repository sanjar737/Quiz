import React from 'react';
import cssClasses from './ActiveQuiz.module.css';
import AnswersList from './AnswersList/AnswersList';

export default function ActiveQuiz(props) {
    return (
        <div className={cssClasses.activeQuiz}>
            <p className={cssClasses.question}>
                <span>
                    <strong>{props.answerNumber}.</strong>&nbsp;
                    {props.question}
                </span>
                <small>{props.answerNumber} из {props.quizLength}</small>
            </p>
            <AnswersList 
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}
                state={props.state}
            />
        </div>
    )
}