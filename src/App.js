import React from 'react';
import './App.css';
import Movie from './components/movie';
import Navbar from './components/common/navbar';
import { Route, Switch, Redirect } from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/not-found';
import MovieForm from './components/movieForm';

function App() {
	return (
		<React.Fragment>
			<Navbar />
			<div className='container'>
				<Switch>
					<Route path='/movies/:id' component={MovieForm} />
					<Route path='/movies' component={Movie} />
					<Route path='/customers' component={Customers} />
					<Route path='/rentals' component={Rentals} />
					<Route path='/not-found' component={NotFound} />
					<Redirect from='/' exact to='/movies' />
					<Redirect to='/not-found' />
				</Switch>
			</div>
		</React.Fragment>
	);
}

export default App;
