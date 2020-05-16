import React, { Component } from 'react';
import Form from './common/form';
import Joi from 'joi-browser';

class RegisterForm extends Form {
	state = {
		data: {
			username: '',
			password: '',
			name: '',
		},
		errors: {},
	};

	schema = {
		username: Joi.string().email().required().label('Username'),
		password: Joi.string().min(5).required().label('Password'),
		name: Joi.string().min(3).required().label('Name'),
	};

	doSubmit = () => {
		// Call the server
		console.log('submitted');
	};

	render() {
		return (
			<div className='container mt-5' style={{ maxWidth: '35vw' }}>
				<h1 className='mb-5' style={{ textAlign: 'center' }}>
					Register
				</h1>
				<form action='' onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderInput('name', 'Name')}
					{this.renderButton('Register')}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
