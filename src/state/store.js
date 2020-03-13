import thunk from "redux-thunk";
import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import authReducer from "./reducers/auth";
import CardReducer from "./reducers/CardReducer";
import {decksReducer, currentDeckReducer} from "./reducers/decks";

const mainReducer = combineReducers({
  authState: authReducer,
  card: CardReducer,
  deckState: decksReducer,
  currentDeckState: currentDeckReducer,
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
