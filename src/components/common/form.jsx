import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
	state = {
		data: {},
		errors: {},
	};

	validate = () => {
		const errors = {};
		const { data } = this.state;
		const { error } = Joi.validate(data, this.schema, { abortEarly: false });
		if (!error) return null;

		for (let item of error.details) {
			errors[item.path[0]] = item.message;
		}

		return errors;
	};

	validateProperty = (input) => {
		// console.log(input);
		const schema = { [input.name]: this.schema[input.name] };
		const obj = { [input.name]: input.value };
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const errors = this.validate();
		// console.log(errors);
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};

	handleChange = ({ currentTarget: input }) => {
		//de-structured  event and picked currentTarget and named it as input
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		this.setState({ errors });

		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ data });
	};

	renderButton = (label) => {
		return (
			<button
				disabled={this.validate()}
				type='submit'
				className='btn btn-primary'>
				{label}
			</button>
		);
	};

	renderInput = (name, label, type = 'text') => {
		const { data, errors } = this.state;
		return (
			<Input
				type={type}
				name={name}
				value={data[name]}
				label={label}
				onChange={this.handleChange}
				error={errors[name]}
			/>
		);
	};

	renderSelect = (name, label, options) => {
		const { data, errors } = this.state;
		// console.log(this.state.data);
		return (
			<Select
				name={name}
				value={data[name]}
				label={label}
				onChange={this.handleChange}
				error={errors[name]}
				options={options}
			/>
		);
	};
}

export default Form;
