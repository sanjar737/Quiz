import React from 'react';
import {Link} from 'react-router-dom';
import cssClasses from './FinishedQuiz.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import Button from '../Ui/Button/Button'

export default function FinishedQuiz(props) {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key]==='success') {
            total++;
        }
        return total;
    }, 0)
    const domQuiz=props.quiz.map((quizItem) => {
        return (
            <li key={quizItem.id}>
                <strong>{quizItem.id}.</strong>&nbsp;
                    {quizItem.question}
                    {props.results[quizItem.id]==='success' ?
                    <FontAwesomeIcon className={`${cssClasses.icon} ${ cssClasses.success }`} icon={ faCheck } /> :
                    <FontAwesomeIcon className={`${cssClasses.icon} ${ cssClasses.error }`} icon={ faTimes } />
                }
            </li>
        )
    })
    return (
        <div className={cssClasses.finishedQuiz}>
            <ul>
                {domQuiz}
            </ul>
            <p>Правильно {successCount} из {props.quiz.length}</p>
            <Button onClick={props.onRetry} type='primary'>Повторить</Button>
            <Link to='/'>
                <Button onClick={props.onRetry} type='success'>Перейти в список тестов</Button>
            </Link>
        </div>
    )
}