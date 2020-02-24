/* const store = {
    isLoggedIn: true||false,
    userData: {
        id: Number,
        full_name: String,
        token: String,
    },
    dashboardState:{
        userDecks: Array,
        recentlyPlayedDecks: Array//Limited to 3 items max
    },
    deckLibrary: Array,//Array of all the user owned and "favored" decks
    discoverDecks: Array,//Array of all decks listed as public
    playState: {
        //deck object
        cards: Array,//Array of all the cards on a deck
        progress: Number,//current card index
    },
    deckView:{
        //deck object
        cards: Array,//Array of all the cards on a deck
    }
} */
import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import isLoggedInReducer from "./IsLoggedIn/isLoggedInReducer";
import userDataReducer from "./userData/userDataReducer";

const mainReducer = combineReducers({
  isLoggedIn: isLoggedInReducer,
  userData: userDataReducer
});

const store = createStore(
  mainReducer,
  {},
  compose(applyMiddleware(thunk /* ,etc , other middlewares */), devTools)
);

export default store;
