import thunk from "redux-thunk";
import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import authReducer from "./reducers/auth";
import {publicDecksReducer, personalDecksReducer} from "./reducers/decks";

const mainReducer = combineReducers({
  authState: authReducer,
  publicDeckState: publicDecksReducer,
  personalDeckState: personalDecksReducer,
});

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    : n => n;

const store = createStore(
  mainReducer,
  {},
  compose(applyMiddleware(thunk /* ,etc , other middlewares */), devTools)
);

export default store;
