import axios from 'axios';
import * as types from './userDataActionTypes';

export const registerNewUser = (newUser) => dispatch => {
    axios.post("http://localhost:4003//api/auth/register", newUser)
    .then(res => {
        console.log(res);
        dispatch({
            type: types.UPDATE_USER_DETAILS,
            payload: res.data
        })
    }).catch(err => {
        console.log(err)
    })
}