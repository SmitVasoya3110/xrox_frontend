import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');
			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	signInWithEmailAndPassword = (Email_Id, Password) => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${process.env.REACT_APP_BACKEND_URL}/CustomerLogin`, { Email_Id, Password })
				.then(response => {
					// if (!response) {
					// 	reject("Please check your internet connection or Server are temporary down !")
					// }
					if (response.data.user) {
						// else {
						this.setSession(response.data.access_token);

						const current_time = new Date().getTime()
						// console.log("current_time", current_time);
						const expired_time = current_time + 60000
						// console.log(expired_time);
						// sessionStorage.setItem("current_time",current_time );
						localStorage.setItem("expired_time", expired_time);
						console.log("response ::",response);
						localStorage.setItem('current_user', JSON.stringify(response.data));
						console.log("response111 ::",response.data.user);
						resolve(response.data.user);
					}

				})
				.catch((error) => {
					// console.log("response111 ::",error);
					if (!error.response) {
						// console.log("Please check your internet connection.");
						reject("Please check your internet connection , Server are temporary down or API connection failed !")
					} else {
						// console.log("response111 ::",error.response);
						reject(error.response.data.message);
					}
				});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			// alert("signInWithToken");
			// console.log(window.localStorage.getItem('current_user'));
			// console.log("window.localStorage.getItem('jwt_access_token')\n",window.localStorage.getItem('jwt_access_token'));

			// console.log("tt \n ", temp, "\n", typeof (temp));
			// console.log("temp.user",temp.user);

			if (window.localStorage.getItem('jwt_access_token') && window.localStorage.getItem('current_user')) {
				let temp = window.localStorage.getItem('current_user');
				// console.log("tt \n ", temp, "\n", typeof (temp));
				temp = JSON.parse(temp)
				this.setSession(window.localStorage.getItem('jwt_access_token'));
				resolve(temp.user);
			} else {
				this.logout();
				reject(new Error('Failed to login with token.'));
			}

		});
	};

	updateUserData = user => {
		return axios.post('/api/auth/user/update', { user });
	};

	setSession = access_token => {
		if (access_token) {
			localStorage.setItem('jwt_access_token', access_token);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem('jwt_access_token');
			delete axios.defaults.headers.common.Authorization;
			localStorage.clear();
		}
	};

	logout = () => {
		this.setSession(null);
		localStorage.clear();
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};
}

const instance = new JwtService();

export default instance;