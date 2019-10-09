import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import cssClasses from './QuizList.module.css';
import axios  from '../../axios/axios-quiz';
import Loader from '../../components/Ui/Loader/Loader';

export default class QuizList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            quizes: []
        }
    }

    renderQuizes() {
        return this.state.quizes.map(quiz=> {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/'+quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get('quizes.json')
            const quizes = []
            if (response.data) {
                Object.keys(response.data).forEach((key, index) => {
                    quizes.push({
                        id:key,
                        name: `Тест №${index+1}`
                    })
                });
            }
            
            this.setState({
                quizes,
                loading: false
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div className={cssClasses.quizList}>
                <div>
                    <h1>Список тестов</h1>
                    {
                        this.state.loading 
                            ? <Loader />
                            : <ul>{this.renderQuizes()}</ul>
                    }
                </div>
            </div>
        )
    }
}