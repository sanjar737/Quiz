import axios from 'axios';
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes';

export default function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        try {
            let url = ''
            if (isLogin) {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDP75D523S7Jn7_hqfWN0PQf4zW4pzLc7k'
            } else {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDP75D523S7Jn7_hqfWN0PQf4zW4pzLc7k'
            }
            const response = await axios.post(url, authData)
            const data = response.data

            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

            localStorage.setItem('token', data.idToken)
            localStorage.setItem('userId', data.localId)
            localStorage.setItem('expirationDate', expirationDate)

            dispatch(authSuccess(data.idToken))
            dispatch(autoLogout(data.expiresIn))
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')

    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogout(timeout) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, timeout*1000);
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}