import axios from '../../axios/axios-quiz';
import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR, FETCH_QUIZ_ERROR, FETCH_QUIZ_SUCCESS, QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QUESTION, RETRY_QUIZ } from './actionTypes';

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key]==='success') {
                return
            }
        }
        
        const question = state.quiz[state.activeQuestion];
        const results = state.results;

        if (question.rigthAnswerId === answerId) {
            if (!results[question.id]){
                results[question.id] = 'success'
            }
            dispatch(quizSetState({ [answerId]: 'success' }, results))
    
            const timeout = setTimeout(() => {
                const isQuizFinished = state.activeQuestion + 1 === state.quiz.length;
                if (isQuizFinished) {
                    dispatch(finishQuiz())
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                }
                clearTimeout(timeout)
            }, 1000);
    
        } else {
            results[question.id] = 'error'
            dispatch(quizSetState({ [answerId]: 'error' }, results))
        }
    } 
}
export function fetchQuizById(quizId) {
    return async dispatch =>  {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`quizes/${quizId}.json`)
            let quiz = []

            if (response.data) {
                quiz = response.data
            }

            dispatch(fetchQuizSuccess(quiz))
        } catch (error) {
            dispatch(fetchQuizError(error))
        }
    } 
}

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('quizes.json')
            const quizes = []

            if (response.data) {
                Object.keys(response.data).forEach((key, index) => {
                    quizes.push({
                        id: key,
                        name: `Тест №${index + 1}`
                    })
                });
            }

            dispatch(fetchQuizesSuccess(quizes))
        } catch (error) {
            dispatch(fetchQuizesError(error))
        }
    }
}
export function retryQuiz() {
    return {
        type: RETRY_QUIZ
    }
}
export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}
export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}
export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}
export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}
export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}
export function fetchQuizError(error) {
    return {
        type: FETCH_QUIZ_ERROR,
        error
    }
}
export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        error
    }
}