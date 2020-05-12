import React, { Component } from 'react';
import { getMovies } from './../services/fakeMovieService';

class Movie extends Component {
	state = {
		movies: getMovies(),
	};
	render() {
		return <div>{this.handleEmptyTable()}</div>;
	}

	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	handleEmptyTable = () => {
		if (this.state.movies.length !== 0) {
			return (
				<React.Fragment>
					<p>Showing {this.state.movies.length} movies in the database</p>
					<table className='table'>
						<thead className='thead-dark'>
							<tr>
								<th scope='col'>Title</th>
								<th scope='col'>Genre</th>
								<th scope='col'>Stock</th>
								<th scope='col'>Rate</th>
								<th scope='col'></th>
							</tr>
						</thead>
						<tbody>
							{this.state.movies.map((movie) => (
								<tr key={movie._id}>
									<td>{movie.title}</td>
									<td>{movie.genre.name}</td>
									<td>{movie.numberInStock}</td>
									<td>{movie.dailyRentalRate}</td>
									<td>
										<button
											onClick={() => this.handleDelete(movie)}
											className='btn btn-danger btn-sm'>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</React.Fragment>
			);
		} else {
			return <p>There are no movies in the database.</p>;
		}
	};
}

export default Movie;
