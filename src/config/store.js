import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
} from 'redux'
import thunk from "redux-thunk";

import reducer from "../reducers/index";

const combinedReducer = combineReducers(reducer);

const store = createStore(
    combinedReducer,
    compose(
        applyMiddleware(thunk),
        (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) || compose
    )
);

export default store;