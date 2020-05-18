import http from './httpService';
import _ from 'lodash';

function movieUrl(id) {
	return `/movies/${id}`;
}

export function getMovies() {
	return http.get(`/movies`);
}

export function getMovie(id) {
	return http.get(movieUrl(id));
}

export function saveMovie(movie) {
	if (movie._id) {
		return http.put(
			`/movies/${movie._id}`,
			_.pick(movie, ['title', 'genreId', 'numberInStock', 'dailyRentalRate'])
		);
	}

	return http.post(`/movies/`, movie);
}

export function deleteMovie(id) {
	return http.delete(movieUrl(id));
}
