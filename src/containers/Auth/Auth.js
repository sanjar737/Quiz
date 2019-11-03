import React, { Component } from 'react';
import is from 'is_js';
import cssClasses from './Auth.module.css';
import Button from '../../components/Ui/Button/Button';
import Input from '../../components/Ui/Input/Input';
import {connect} from 'react-redux';
import auth from '../../store/actions/auth';

class Auth extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isFormValid: false,
            formControls: {
                email:{
                    value: '',
                    type: 'email',
                    label: 'Email',
                    errorMessage: 'Введите корректный email',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        email: true
                    }
                },
                password: {
                    value: '',
                    type: 'password',
                    label: 'Пароль',
                    errorMessage: 'Введите корректный пароль',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6
                    }
                },
            }
        }
        this.registerHandler = this.registerHandler.bind(this)
        this.loginHandler = this.loginHandler.bind(this)
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName+index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={(e)=>{this.inputChangeHandler(e, controlName)}}
                />
            )
        })
    }

    validateControl(value, validation) {
        if(!validation) {
            return true
        }

        let isValid = true
        if(validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if(validation.email) {
            isValid = is.email(value) && isValid
        }

        if(validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid

    }

    inputChangeHandler(e, controlName) {
        const formControls = Object.assign({}, this.state.formControls)
        const control = Object.assign({}, formControls[controlName])
        let isFormValid

        control.value=e.target.value
        control.touched=true
        control.valid=this.validateControl(control.value, control.validation)
        
        formControls[controlName]=control

        const arrayValidElem = Object.keys(formControls).map(controlName=>{
            controlName = formControls[controlName].valid
            return controlName
        })   
        
        isFormValid = !arrayValidElem.includes(false)

        this.setState({
            formControls,
            isFormValid
        })
    }

    loginHandler() {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )
    }

    registerHandler() {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )
    }

    submitHandler(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className={cssClasses.auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className={cssClasses.authForm}>
                        {this.renderInputs()}
                        <Button 
                            type='success' 
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >Войти</Button>
                        <Button 
                            type='primary' 
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >Зарегистрироваться</Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth (email, password, isLogin) {dispatch(auth(email, password, isLogin))} 
    }
}

export default connect(null, mapDispatchToProps)(Auth) 