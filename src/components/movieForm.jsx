import React, { Component } from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getGenres } from './../services/genreService';
import { getMovie, saveMovie } from './../services/movieService';

class MovieDetails extends Form {
	state = {
		data: {
			title: '',
			genreId: '',
			numberInStock: 0,
			dailyRentalRate: 0,
		},
		genres: [],
		errors: {},
	};

	populateGenres = async () => {
		const { data: genres } = await getGenres();
		this.setState({ genres });
	};

	populateMovie = async () => {
		try {
			const movieId = this.props.match.params.id;
			if (movieId === 'new') return;

			const { data: movie } = await getMovie(movieId);
			this.setState({
				data: {
					_id: movie._id,
					title: movie.title,
					genreId: movie.genre._id,
					numberInStock: movie.numberInStock,
					dailyRentalRate: movie.dailyRentalRate,
				},
			});
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				this.props.history.replace('/not-found');
		}
	};

	async componentDidMount() {
		await this.populateGenres();
		await this.populateMovie();
	}

	schema = {
		_id: Joi.string(),
		title: Joi.string().min(3).required().label('Title'),
		genreId: Joi.string().required().label('Genre'),
		numberInStock: Joi.number().min(0).max(100).required().label('Stock'),
		dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate'),
	};

	doSubmit = () => {
		const { push } = this.props.history;

		saveMovie(this.state.data);

		push('/movies');
		console.log('Submitted');
	};

	render() {
		return (
			<div className='container mt-5' style={{ maxWidth: '35vw' }}>
				<h1 className='mb-5' style={{ textAlign: 'center' }}>
					Movie Form
				</h1>
				<form action='' onSubmit={this.handleSubmit}>
					{this.renderInput('title', 'Title')}
					{this.renderSelect('genreId', 'Genre', this.state.genres)}
					{this.renderInput('numberInStock', 'Stock', 'number')}
					{this.renderInput('dailyRentalRate', 'Rate', 'number')}
					{this.renderButton('Save')}
				</form>
			</div>
		);
	}
}

export default MovieDetails;
