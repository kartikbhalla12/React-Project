import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { loginUser } from './../services/authService';

class LoginForm extends Form {
	state = {
		data: { username: '', password: '' },
		errors: {},
	};
	schema = {
		username: Joi.string().required().label('Username'),
		password: Joi.string().required().label('Password'),
	};

	doSubmit = async () => {
		const { username, password } = this.state.data;
		try {
			const { state } = this.props.location;
			await loginUser(username, password);
			window.location = state ? state.from.pathname : '/';
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.password = ex.response.data;
				this.setState({ errors });
			}
		}
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
