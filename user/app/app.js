import React from 'react';
import ReactDOM from 'react-dom';
import {Route, hashHistory, Router, IndexRedirect} from 'react-router';
import {Provider} from 'react-redux';
import store  from './store/store.js';
import BaseContainer from './containers/BaseContainer/BaseContainer.js';
import LoginContainer from './containers/LoginContainer/LoginContainer.js';
import SignUpContainer from './containers/SignUpContainer/SignUpContainer.js';
import OrganizationContainer from './containers/OrganizationContainer/OrganizationContainer.js';
import {loginCheck, orgCheck} from './checks/checks.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(

	<Provider store = {store}>
		<Router history = {hashHistory} >
			<Route path = '/' component = {BaseContainer}  >
				<IndexRedirect to = '/login' />
				<Route onEnter = {loginCheck} path = 'login' component = {LoginContainer} />
				<Route path = "signUp" component = {SignUpContainer} />
				<Route onEnter = {orgCheck} path = "org/:childRoute" component = {OrganizationContainer} />
			</Route>
		</Router>

	</Provider>

,document.getElementById('app'));