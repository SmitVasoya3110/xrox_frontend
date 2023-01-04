import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "axios";
import jwtDecode from "jwt-decode";
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			(response) => {
				return response;
			},
			(err) => {
				return new Promise((resolve, reject) => {
					if (
						err.response.status === 401 &&
						err.config &&
						!err.config.__isRetryRequest
					) {
						// if you ever get an unauthorized response, logout the user
						this.emit("onAutoLogout", "Invalid access_token");
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
			this.emit("onNoAccessToken");
			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit("onAutoLogin", true);
		} else {
			this.setSession(null);
			this.emit("onAutoLogout", "access_token expired");
		}
	};

	signInWithEmailAndPassword = (formData) => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login/`, formData)
				.then((response) => {
					console.log("response", response);

					if (response?.data?.status === 200) {
						this.setSession(response?.data?.token);
						const temp = response?.data?.data;
						const userData = {
							data: {
								date_joined: temp?.date_joined,
								email: temp.email,
								id: temp.id,
								mobile_number: temp.id,
								username: temp.username,
								displayName: temp.username,
								photoURL: ""
							},
							role: "Customer",
							uuid: temp.id

						};
						console.log("response111 ::", userData);

						const current_time = new Date().getTime();
						const expired_time = current_time + 60000;
						localStorage.setItem("expired_time", expired_time);
						localStorage.setItem("timeStemp", Math.floor(Date.now() / 1000));
						console.log("response ::", response);
						localStorage.setItem("current_user", JSON.stringify(userData));
						resolve(userData);
					}
				})
				.catch((error) => {
					console.log("response111 ::", error);
					if (!error.response) {
						reject(
							"Please check your internet connection , Server are temporary down or API connection failed !"
						);
					} else {
						console.log("response111 ::", error.response);
						if (error?.response?.status === 401) {
							reject("Invalid email and password!");
						} else {
							reject(
								error?.response?.data?.status_message || "Something went wrong!"
							);
						}
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

			if (
				window.localStorage.getItem("jwt_access_token") &&
				window.localStorage.getItem("current_user")
			) {
				let temp = window.localStorage.getItem("current_user");
				console.log("tt \n ", temp, "\n", typeof (temp));
				temp = JSON.parse(temp);
				this.setSession(window.localStorage.getItem("jwt_access_token"));
				resolve(temp);
			} else {
				this.logout();
				reject(new Error("Failed to login with token."));
			}
		});
	};

	updateUserData = (user) => {
		return axios.post("/api/auth/user/update", { user });
	};

	setSession = (access_token) => {
		if (access_token) {
			localStorage.setItem("jwt_access_token", access_token);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem("jwt_access_token");
			delete axios.defaults.headers.common.Authorization;
			localStorage.clear();
		}
	};

	logout = () => {
		this.setSession(null);
		localStorage.clear();
	};

	isAuthTokenValid = (access_token) => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn("access token expired");
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem("jwt_access_token");
	};
}

const instance = new JwtService();

export default instance;
