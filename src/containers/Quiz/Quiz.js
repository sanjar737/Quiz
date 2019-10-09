import React, { Component } from 'react';
import cssClasses from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios  from '../../axios/axios-quiz';
import Loader from '../../components/Ui/Loader/Loader';

export default class Quiz extends Component {
    constructor(props) {
        super(props)
        this.onAnswerClickHandler = this.onAnswerClickHandler.bind(this);
        this.retryHandler = this.retryHandler.bind(this);
        this.state = {
            loading: true,
            results: {
            },
            isFinished: false,
            answerState: null,
            activeQuestion: 0,
            quiz: []
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
        if (question.rigthAnswerId === answerId) {
            if (!results[question.id]){
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

    async componentDidMount() {
        try {
            const quizId = this.props.match.params.id;
            const response = await axios.get(`quizes/${quizId}.json`)
            let quiz = []

            if (response.data) {
                quiz = response.data
            }

            this.setState({
                quiz,
                loading: false
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div className={cssClasses.quiz}>
                <div className={cssClasses.quizWrapper}>
                    <h1>Quiz</h1>
                    {
                        this.state.isFinished  
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                             /> 
                            : this.state.loading
                                ? <Loader />
                                : this.state.quiz.length!==0 
                                    ? <ActiveQuiz
                                        question={this.state.quiz[this.state.activeQuestion].question}
                                        answers={this.state.quiz[this.state.activeQuestion].answers}
                                        onAnswerClick={this.onAnswerClickHandler}
                                        quizLength={this.state.quiz.length}
                                        answerNumber={this.state.activeQuestion + 1}
                                        state={this.state.answerState}
                                     />
                                    : null
                    }
                </div>
            </div>
        )
    }
}