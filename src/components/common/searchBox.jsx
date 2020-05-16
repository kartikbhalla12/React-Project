import React, { Component } from 'react';
import Form from './form';

class SearchBox extends Form {
	render() {
		const { value, onSearch } = this.props;
		return (
			<input
				type='text'
				name='query'
				value={value}
				placeholder='Search...'
				className='form-control my-2'
				onChange={onSearch}
			/>
		);
	}
}

export default SearchBox;
