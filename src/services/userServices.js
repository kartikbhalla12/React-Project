import http from './httpService';

const apiEndPoint = `/users`;

export function registerUser(user) {
	return http.post(apiEndPoint, {
		email: user.username,
		password: user.password,
		name: user.name,
	});
}
