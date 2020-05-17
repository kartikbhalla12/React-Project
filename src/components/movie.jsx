import React, { Component } from 'react';
import { getMovies, deleteMovie } from './../services/movieService';
import { getGenres } from './../services/genreService';
import Pagination from './common/pagination';
import { paginate } from './../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import SearchBox from './common/searchBox';
import { toast } from 'react-toastify';

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
		query: '',
	};

	async componentDidMount() {
		// const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];

		const { data } = await getGenres();
		const genres = [{ _id: '', name: 'All Genres' }, ...data];

		const { data: movies } = await getMovies();
		this.setState({
			movies,
			genres,
			selectedGenre: genres[0],
		});
	}
	render() {
		const { length: count } = this.state.movies;
		if (count === 0) return <p>There are no movies in the database.</p>;

		const { pageMovies, totalCount } = this.getPageData();
		return (
			<div className='row mt-4'>
				<div className='col-2'>
					<ListGroup
						items={this.state.genres}
						onItemSelect={this.handleGenreSelect}
						selectedItem={this.state.selectedGenre}
					/>
				</div>
				<div className='col'>
					<button
						className='btn btn-primary btn-m mb-4'
						onClick={() => this.props.history.push('/movies/new')}>
						New Movie
					</button>
					<p>Showing {totalCount} movies from the database</p>
					<SearchBox value={this.state.query} onSearch={this.handleSearch} />
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

	handleDelete = async (movie) => {
		const originalMovies = this.state.movies;
		console.log(originalMovies);
		const movies = originalMovies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
		try {
			await deleteMovie(movie._id);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				toast.error('The movie has already been deleted');
				this.setState({ movies: originalMovies });
			}
		}
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
		this.setState({ selectedGenre: genre, currPage: 1, query: '' });
	};

	handleSort = (sortColumn) => {
		this.setState({
			sortColumn,
		});
	};

	handleSearch = (event) => {
		const query = event.currentTarget.value;
		this.setState({ query, currPage: 1, selectedGenre: this.state.genres[0] });
	};

	getPageData = () => {
		const {
			movies,
			currPage,
			pageSize,
			selectedGenre,
			sortColumn,
			query,
		} = this.state;

		let filtered;
		if (query) {
			filtered = movies.filter((movie) => {
				return movie.title.toLowerCase().startsWith(query.toLowerCase());
			});
		} else if (selectedGenre && selectedGenre._id)
			filtered = movies.filter((m) => m.genre._id === selectedGenre._id);
		else filtered = movies;

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const pageMovies = paginate(sorted, currPage, pageSize);

		return {
			pageMovies,
			totalCount: filtered.length,
		};
	};
}

export default Movie;
