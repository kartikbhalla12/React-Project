import React from 'react';
import './App.css';
import Movie from './components/movie';
import Navbar from './components/common/navbar';
import { Route, Switch, Redirect } from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/not-found';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<React.Fragment>
			<ToastContainer />
			<Navbar />
			<div className='container'>
				<Switch>
					<Route path='/movies/:id' component={MovieForm} />
					<Route path='/movies' component={Movie} />
					<Route path='/customers' component={Customers} />
					<Route path='/rentals' component={Rentals} />
					<Route path='/login' component={LoginForm} />
					<Route path='/register' component={RegisterForm} />
					<Route path='/not-found' component={NotFound} />
					<Redirect from='/' exact to='/movies' />
					<Redirect to='/not-found' />
				</Switch>
			</div>
		</React.Fragment>
	);
}

export default App;
