import http from './httpService';
import { apiUrl } from '../config.json';
import _ from 'lodash';

function movieUrl(id) {
	return `${apiUrl}/movies/${id}`;
}

export function getMovies() {
	return http.get(`${apiUrl}/movies`);
}

export function getMovie(id) {
	return http.get(movieUrl(id));
}

export function saveMovie(movie) {
	if (movie._id) {
		return http.put(
			`${apiUrl}/movies/${movie._id}`,
			_.pick(movie, ['title', 'genreId', 'numberInStock', 'dailyRentalRate'])
		);
	}

	return http.post(`${apiUrl}/movies/`, movie);
}

export function deleteMovie(id) {
	return http.delete(movieUrl(id));
}
