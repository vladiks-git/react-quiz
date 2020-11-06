import Axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export function auth(email, password, isLogin){
    return async dispatch => {
        const authData = {
            email, password, returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA5LZ_bx5pD-7eVIBwSBBnDoEE8eQtPCYk'
        if(isLogin){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA5LZ_bx5pD-7eVIBwSBBnDoEE8eQtPCYk'
        }

        try {
            const response = await Axios.post(url, authData)
            const data = response.data
            console.log(data)

            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

            localStorage.setItem('token', data.idToken)
            localStorage.setItem('userId', data.localId)
            localStorage.setItem('expirationDate', expirationDate)

            dispatch(authSuccess(data.idToken))
            dispatch(autoLogOut(data.expiresIn))


        }catch (e) {
            console.log(e)
        }
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()){
                dispatch(logout())
            }else {
                dispatch(authSuccess(token))
                dispatch(autoLogOut((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export function autoLogOut(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function logout() {
    return{
        type: AUTH_LOGOUT
    }
}