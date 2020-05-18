import React, { Component } from 'react';
import Table from './common/table';
import Like from './common/like';
import { Link } from 'react-router-dom';
import { getCurrentUser } from './../services/authService';

class moviesTable extends Component {
	columns = [
		{
			path: 'title',
			label: 'Title',
			content: (movie) => (
				<Link to={`/movies/${movie._id}`}>{movie.title}</Link>
			),
		},
		{ path: 'genre.name', label: 'Genre' },
		{ path: 'numberInStock', label: 'Stock' },
		{ path: 'dailyRentalRate', label: 'Rate' },
		{
			key: 'like',
			content: (movie) => (
				<Like liked={movie.liked} onLike={() => this.props.onLike(movie)} />
			),
		},
	];

	deleteColumn = {
		key: 'delete',
		content: (movie) =>
			getCurrentUser().isAdmin && (
				<button
					onClick={() => this.props.onDelete(movie)}
					className='btn btn-danger btn-sm'>
					Delete
				</button>
			),
	};

	constructor() {
		super();
		const user = getCurrentUser();
		if (user && user.isAdmin) {
			this.columns.push(this.deleteColumn);
		}
	}

	render() {
		const { pageMovies, sortColumn, onSort } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={pageMovies}
			/>
		);
	}
}

export default moviesTable;
