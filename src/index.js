import React from 'react';
import ReactDOM from 'react-dom';
import './assets/vendor/bootstrap/bootstrap.css';
import './assets/vendor/icon-hs/style.css';
import './assets/css/unify-core.css';
import './assets/css/unify-components.css';
import './assets/css/unify-globals.css';
import './assets/css/custom.css';
import './assets/vendor/sky-forms-2.0.5/css/custom-sky-forms.css';
//import './assets/vendor/bootstrap/bootstrap.min.js';

import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from './store/reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';

const store = createStore(reducers,applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
	<BrowserRouter>
			<App />
	</BrowserRouter>
	</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
