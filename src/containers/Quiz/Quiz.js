import React, { Component } from 'react';
import cssClasses from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

export default class Quiz extends Component {
    constructor(props) {
        super(props)
        this.onAnswerClickHandler = this.onAnswerClickHandler.bind(this);
        this.retryHandler = this.retryHandler.bind(this);
        this.state = {
            results: {

            },
            isFinished: false,
            answerState: null,
            activeQuestion: 0,
            quiz: [
                {
                    id: 1,
                    question: 'Какого цвета небо?',
                    rightAnswerId: 2,
                    answers: [
                        { id: 1, text: 'Черный' },
                        { id: 2, text: 'Синий' },
                        { id: 3, text: 'Красный' },
                        { id: 4, text: 'Зеленый' }
                    ]
                },
                {
                    id: 2,
                    question: 'В каком году основали Санкт-Петербург?',
                    rightAnswerId: 3,
                    answers: [
                        { id: 1, text: '1700' },
                        { id: 2, text: '1702' },
                        { id: 3, text: '1703' },
                        { id: 4, text: '1803' }
                    ]
                }
            ]
        }
    }

    retryHandler() {
        this.setState({
            isFinished: false,
            answerState: null,
            activeQuestion: 0,
            results: {}
        })
    }

    onAnswerClickHandler(answerId) {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key]==='success') {
                return
            }
        }
        
        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;
        
        if (question.rightAnswerId === answerId) {
            if(!results[question.id]){
                results[question.id] = 'success'
            }
            this.setState({
                answerState: { [answerId]: 'success' },
                results: results
            })

            const timeout = setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({isFinished: true})
                } else {
                    this.setState(prevState => {
                        return {
                            activeQuestion: prevState.activeQuestion + 1,
                            answerState: null
                        };
                    })
                }
                clearTimeout(timeout)
            }, 1000);

        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: { [answerId]: 'error' },
                results: results
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }
    render() {
        return (
            <div className={cssClasses.quiz}>
                <div className={cssClasses.quizWrapper}>
                    <h1>Quiz</h1>
                    {
                        this.state.isFinished ? 
                            <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                            /> :
                            <ActiveQuiz
                                question={this.state.quiz[this.state.activeQuestion].question}
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}