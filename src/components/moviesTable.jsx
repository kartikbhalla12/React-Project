import React, { Component } from 'react';
import Table from './common/table';
import Like from './common/like';

class moviesTable extends Component {
	state = {
		columns: [
			{ path: 'title', label: 'Title' },
			{ path: 'genre.name', label: 'Genre' },
			{ path: 'numberInStock', label: 'Stock' },
			{ path: 'dailyRentalRate', label: 'Rate' },
			{
				key: 'like',
				content: (movie) => (
					<Like liked={movie.liked} onLike={() => this.props.onLike(movie)} />
				),
			},
			{
				key: 'delete',
				content: (movie) => (
					<button
						onClick={() => this.props.onDelete(movie)}
						className='btn btn-danger btn-sm'>
						Delete
					</button>
				),
			},
		],
	};

	render() {
		const { pageMovies, sortColumn, onSort } = this.props;
		return (
			<Table
				columns={this.state.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={pageMovies}
			/>
		);
	}
}

export default moviesTable;
