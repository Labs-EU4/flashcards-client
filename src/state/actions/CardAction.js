import {ADD_CARD, UPDATE_CARD, DELETE_CARD, FETCH_CARDS, GET_DECK_BY_ID} from "../types";
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

export const deleteCard = id => dispatch => {
  axiosWithAuth()
    .delete(`/cards/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_CARD,
        payload: id,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

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

export const getDeckId = id => dispatch => {
  axiosWithAuth()
    .get(`/decks/${id}`)
    .then(res => {
      dispatch({
        type: GET_DECK_BY_ID,
        payload: res.data.deck,
      });
    })
    .catch(err => {
      console.log(err);
    });
};
