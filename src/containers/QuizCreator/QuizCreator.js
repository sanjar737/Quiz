import React, { Component, Fragment } from 'react';
import cssClasses from './QuizCreator.module.css';
import Button from '../../components/Ui/Button/Button';
import Input from '../../components/Ui/Input/Input'
import Select from '../../components/Ui/Select/Select'
import { createControl, validate, validateForm } from '../../formFramework/formFramework';
import { connect } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create';

function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: "Значение не может быть пустым",
        id: number
    }, { required: true })
}

function createFormControl() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: "Вопрос не может быть пустым"
        }, { required: true }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

class QuizCreator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControl()
        }
        this.selectChangeHandler = this.selectChangeHandler.bind(this)
        this.addQuestionHandler = this.addQuestionHandler.bind(this)
        this.createQuizHandler = this.createQuizHandler.bind(this)
    }

    submitHandler(e) {
        e.preventDefault();
    }

    addQuestionHandler() {
        const { question, option1, option2, option3, option4 } = this.state.formControls

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rigthAnswerId: this.state.rigthAnswerId,
            answers: [
                { id: option1.id, text: option1.value },
                { id: option2.id, text: option2.value },
                { id: option3.id, text: option3.value },
                { id: option4.id, text: option4.value },
            ]
        }

        this.props.createQuizQuestion(questionItem)

        this.setState({
            isFormValid: false,
            rigthAnswerId: 1,
            formControls: createFormControl()
        })
    }

    createQuizHandler() {
        this.setState({
            isFormValid: false,
            rigthAnswerId: 1,
            formControls: createFormControl()
        })

        this.props.finishCreateQuiz()
    }

    inputChangeHandler(e, controlName) {
        const formControls = Object.assign({}, this.state.formControls)
        const control = Object.assign({}, formControls[controlName])


        control.touched = true
        control.value = e.target.value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    selectChangeHandler(e) {
        this.setState({
            rigthAnswerId: Number(e.target.value)
        })
    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Fragment key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.valid}
                        onChange={e => { this.inputChangeHandler(e, controlName) }}
                    />
                    {controlName === 'question' ? <hr /> : null}
                </Fragment>
            )
        })
    }

    render() {
        return (
            <div className={cssClasses.quizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderControls()}
                        <Select
                            label={'Выберите правильный ответ'}
                            value={this.state.rigthAnswerId}
                            onChange={this.selectChangeHandler}
                            options={[
                                { text: 1, value: 1 },
                                { text: 2, value: 2 },
                                { text: 3, value: 3 },
                                { text: 4, value: 4 }
                            ]}
                        />
                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type='success'
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: questionItem => dispatch(createQuizQuestion(questionItem)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)