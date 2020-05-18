import http from './httpService';
import { apiUrl } from '../config.json';
import jwtDecode from 'jwt-decode';

const apiEndPoint = `${apiUrl}/auth`;
const token = 'token';

http.setJwt(localStorage.getItem(token));
export async function loginUser(username, password) {
	const { data: jwt } = await http.post(apiEndPoint, {
		email: username,
		password: password,
	});
	localStorage.setItem(token, jwt);
}

export function logout() {
	localStorage.removeItem(token);
}

export function getCurrentUser() {
	const jwt = localStorage.getItem(token);
	return jwt ? jwtDecode(jwt) : null;
}

export function loginWithJwt(jwt) {
	localStorage.setItem(token, jwt);
}

export default {
	loginUser,
	logout,
	getCurrentUser,
	loginWithJwt,
};
