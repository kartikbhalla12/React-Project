import axios from 'axios';
import { toast } from 'react-toastify';
import { log } from './loggingService';

axios.interceptors.response.use(null, (error) => {
	if (
		!(
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500
		)
	) {
		log(error);
		toast.error('Something Failed');
	}

	return Promise.reject(error);
});

function setJwt(jwt) {
	axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	setJwt,
};
