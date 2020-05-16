import React, { Component } from 'react';

class Select extends Component {
	render() {
		const { name, label, error, onChange, options, value } = this.props;
		return (
			<div className='form-group'>
				<label htmlFor={name}>{label}</label>
				<select
					name={name}
					className='form-control'
					id={name}
					value={value}
					onChange={onChange}>
					<option value=''></option>
					{options.map((option) => (
						<option key={option._id} value={option._id}>
							{option.name}
						</option>
					))}
				</select>
				{error && <div className='alert alert-danger mt-2'>{error}</div>}
			</div>
		);
	}
}

export default Select;
