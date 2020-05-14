import React, { Component } from 'react';
import { getMovies } from './../services/fakeMovieService';
import { getGenres } from './../services/fakeGenreService';
import Pagination from './common/pagination';
import { paginate } from './../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movie extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currPage: 1,
		sortColumn: {
			path: 'title',
			order: 'asc',
		},
	};

	componentDidMount() {
		const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];

		this.setState({ movies: getMovies(), genres, selectedGenre: genres[0] });
	}
	render() {
		const { length: count } = this.state.movies;
		if (count === 0) return <p>There are no movies in the database.</p>;

		const { pageMovies, totalCount } = this.getPageData();
		return (
			<div className='row'>
				<div className='col-2'>
					<ListGroup
						items={this.state.genres}
						onItemSelect={this.handleGenreSelect}
						selectedItem={this.state.selectedGenre}
					/>
				</div>
				<div className='col'>
					<p>Showing {totalCount} movies from the database</p>
					<MoviesTable
						pageMovies={pageMovies}
						sortColumn={this.state.sortColumn}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
					/>
					<Pagination
						itemsCount={totalCount}
						pageSize={this.state.pageSize}
						onPageChange={this.handlePageChange}
						currPage={this.state.currPage}
					/>
				</div>
			</div>
		);
	}

	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	handleLike = (movie) => {
		const movies = this.state.movies.map((m) => {
			if (m._id === movie._id) m.liked = !m.liked;
			return m;
		});
		this.setState({ movies });
	};

	handlePageChange = (page) => {
		this.setState({ currPage: page });
	};

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currPage: 1 });
	};

	handleSort = (sortColumn) => {
		this.setState({
			sortColumn,
		});
	};

	getPageData = () => {
		const {
			movies,
			currPage,
			pageSize,
			selectedGenre,
			sortColumn,
		} = this.state;

		const filtered =
			selectedGenre && selectedGenre._id
				? movies.filter((m) => m.genre._id === selectedGenre._id)
				: movies;

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const pageMovies = paginate(sorted, currPage, pageSize);

		return {
			pageMovies,
			totalCount: filtered.length,
		};
	};
}

export default Movie;
