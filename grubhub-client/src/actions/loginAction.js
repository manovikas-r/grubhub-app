import { USER_LOGIN, USER_LOGOUT } from './types';
import axios from 'axios';

export const userLogin = (loginData) => dispatch => {
    axios.post('http://localhost:3001/grubhub/login', loginData)
        .then(response => dispatch({
            type: USER_LOGIN,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: USER_LOGIN,
                    payload: error.response.data
                });
            }
            return;
        });
}

export const userLogout = () => dispatch => dispatch({type: USER_LOGOUT});