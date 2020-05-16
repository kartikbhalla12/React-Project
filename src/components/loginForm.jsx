import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class LoginForm extends Form {
	state = {
		data: { username: '', password: '' },
		errors: {},
	};
	schema = {
		username: Joi.string().required().label('Username'),
		password: Joi.string().required().label('Password'),
	};

	doSubmit = () => {
		// Call the server
		console.log('submitted');
	};

	render() {
		return (
			<div className='container mt-5' style={{ maxWidth: '35vw' }}>
				<h1 className='mb-5' style={{ textAlign: 'center' }}>
					Login
				</h1>
				<form action='' onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderButton('Login')}
				</form>
			</div>
		);
	}
}

export default LoginForm;
