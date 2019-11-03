import React, { Component } from 'react';
import cssClasses from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/Ui/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz';

class Quiz extends Component {

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    render() {
        return (
            <div className={cssClasses.quiz}>
                <div className={cssClasses.quizWrapper}>
                    <h1>Quiz</h1>
                    {
                        this.props.isFinished  
                            ? <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onRetry={this.props.retryQuiz}
                             /> 
                            : this.props.loading
                                ? <Loader />
                                : this.props.quiz 
                                    ? <ActiveQuiz
                                        question={this.props.quiz[this.props.activeQuestion].question}
                                        answers={this.props.quiz[this.props.activeQuestion].answers}
                                        onAnswerClick={this.props.quizAnswerClick}
                                        quizLength={this.props.quiz.length}
                                        answerNumber={this.props.activeQuestion + 1}
                                        state={this.props.answerState}
                                     />
                                    : null
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.quiz.loading,
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        answerState: state.quiz.answerState,
        activeQuestion: state.quiz.activeQuestion,
        quiz: state.quiz.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)