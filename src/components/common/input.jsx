import React, { Component } from 'react';

class Input extends Component {
	render() {
		const { name, label, error, ...rest } = this.props;
		return (
			<div className='form-group'>
				<label htmlFor={name}>{label}</label>
				<input
					// value={value}
					// onChange={onChange}
					// type={type}
					{...rest}
					name={name}
					id={name}
					className='form-control'
				/>
				{error && <div className='alert alert-danger mt-2'>{error}</div>}
			</div>
		);
	}
}

export default Input;
