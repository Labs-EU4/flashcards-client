import {ADD_CARD, UPDATE_CARD, DELETE_CARD, FETCH_CARDS} from "../types";
import {axiosWithAuth} from "../../utils/axios";

export const addCard = newCard => dispatch => {
  axiosWithAuth()
    .post(`/cards`, newCard)
    .then(res => {
      dispatch({
        type: ADD_CARD,
        payload: res.data.card,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateCard = (id, newCard) => dispatch => {
  axiosWithAuth()
    .put(`/cards/${id}`, newCard)
    .then(res => {
      dispatch({
        type: UPDATE_CARD,
        payload: res.data.card,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// export function deleteCard() {
//   return {
//     type: DELETE_CARD,
//   };
// }

export const getCards = () => dispatch => {
  axiosWithAuth()
    .get(`/cards`)
    .then(res => {
      dispatch({
        type: FETCH_CARDS,
        payload: res.data.card,
      });
    })
    .catch(err => {
      console.log(err);
    });
};
