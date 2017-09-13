import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import * as reducers from './redux/modules';
import App from './App';

const middlewares = [thunk, apiMiddleware];

const store = createStore(
	combineReducers(reducers),
	compose(
		applyMiddleware(...middlewares),
		process.env.NODE_ENV === 'development' && window.devToolsExtension
			? window.devToolsExtension()
			: f => f
	)
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
