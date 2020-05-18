import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndPoint = `${apiUrl}/users`;

export function registerUser(user) {
	return http.post(apiEndPoint, {
		email: user.username,
		password: user.password,
		name: user.name,
	});
}
