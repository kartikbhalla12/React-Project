import React, { Component } from 'react';
import './App.css';
import Movie from './components/movie';
import Navbar from './components/common/navbar';
import { Route, Switch, Redirect } from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/not-found';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import RegisterForm from './components/registerForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentUser } from './services/authService';
import ProtectedRoute from './components/common/protectedRoute';

class App extends Component {
	state = {};

	componentDidMount() {
		const user = getCurrentUser();
		this.setState({ user });
	}

	render() {
		const { user } = this.state;
		return (
			<React.Fragment>
				<ToastContainer />
				<Navbar user={this.state.user} />
				<div className='container'>
					<Switch>
						<ProtectedRoute path='/movies/:id' component={MovieForm} />
						{/* <Route
							path='/movies/:id'
							render={(props) => {
								if (!user) return <Redirect to='/login' />;
								return <MovieForm {...props} />;
							}}
						/> */}
						<Route
							path='/movies'
							render={(props) => <Movie {...props} user={user} />}
						/>
						<Route path='/customers' component={Customers} />
						<Route path='/rentals' component={Rentals} />
						<Route path='/login' component={LoginForm} />
						<Route path='/logout' component={Logout} />
						<Route path='/register' component={RegisterForm} />
						<Route path='/not-found' component={NotFound} />
						<Redirect from='/' exact to='/movies' />
						<Redirect to='/not-found' />
					</Switch>
				</div>
			</React.Fragment>
		);
	}
}

export default App;
