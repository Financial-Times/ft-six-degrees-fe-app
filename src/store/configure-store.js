import {createStore, applyMiddleware, compose} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
// import apiMiddleware from '../middlewares/api';
import { apiMiddleware } from 'redux-api-middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let middlewares = [thunk, apiMiddleware];

middlewares = process.env.NODE_ENV !== 'production' ?
	[...middlewares, reduxImmutableStateInvariant()] :
	[...middlewares];

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middlewares))
    );
}
