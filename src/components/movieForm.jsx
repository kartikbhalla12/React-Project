import React, { Component } from 'react';

class MovieDetails extends Component {
	state = {};
	render() {
		const { params } = this.props.match;
		return (
			<React.Fragment>
				<h1>Movie Form</h1>
				<p>{params.id}</p>
				<button className='btn btn-primary btn-m' onClick={this.handleSave}>
					Save
				</button>
			</React.Fragment>
		);
	}

	handleSave = () => {
		const { push } = this.props.history;
		push('/movies');
	};
}

export default MovieDetails;
