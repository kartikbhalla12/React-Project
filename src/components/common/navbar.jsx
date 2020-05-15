import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class Navbar extends Component {
	state = {};
	render() {
		return (
			<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
				<span className='m-2 text-white' style={{ fontSize: 20 }}>
					Vidly
				</span>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>

				<div className='collapse navbar-collapse justify-content-md-center'>
					<ul className='navbar-nav'>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/movies'>
								Movies
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/customers'>
								Customers
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/rentals'>
								Rentals
							</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Navbar;
