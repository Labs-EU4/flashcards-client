import axios from 'axios';
import * as types from './userDataActionTypes';

export const registerNewUser = (newUser) => dispatch => {
    axios.post("http://localhost:4003/api/auth/register", newUser)
    .then(res => {
        console.log(res.data.data.user);
        dispatch({
            type: types.UPDATE_USER_DETAILS,
            payload: {userData: res.data.data.user}
        })
    }).catch(err => {
        console.log(err)
    })
}