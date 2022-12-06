import FuseAuthorization from '@fuse/core/FuseAuthorization';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import history from '@history';
import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import Provider from 'react-redux/es/components/Provider';
import { Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import DateFnsUtils from '@date-io/date-fns';
import axios from "axios";
import jwtService from "app/services/jwtService";
import AppContext from './AppContext';
import { Auth } from './auth';
import routes from './fuse-configs/routesConfig';
import store from './store';

const jss = create({
	...jssPreset(),
	plugins: [...jssPreset().plugins, jssExtend(), rtl()],
	insertionPoint: document.getElementById('jss-insertion-point')
});

const generateClassName = createGenerateClassName({ disableGlobal: true });


// try {
// 	setInterval(() => {
// 		// console.log(window.localStorage.getItem('jwt_access_token'), "ac");
// 		console.log(window.localStorage.getItem('expired_time'), "et");
// 		// /////// if jwt_access_token')  &&  expired_time') found then 
// 		if (window.localStorage.getItem('jwt_access_token') && window.localStorage.getItem('expired_time')) {

// 			// /////// expired_time greter then cuttent time then we call refreshh token api
// 			// /////// new Date().getTime() will give current time in milliseconds
// 			if (parseInt(window.localStorage.getItem('expired_time')) < parseInt(new Date().getTime())) {
// 				console.log('Interval triggered --------------------- ------------------- ------------------- -------------------------------- 00000000000000000000000000000000 99999999999999999999999999999 88888888888888888888888888 66666666666666666666666 5555555555555555555');

// 				axios.post(`${process.env.REACT_APP_BACKEND_URL}/RefreshToken`)
// 					.then(res => {
// 						localStorage.setItem("jwt_access_token", res.data.access_token);
// 						let userData = JSON.parse(localStorage.getItem("current_user"));
// 						userData.access_token = res.data.access_token
// 						localStorage.setItem("current_user", JSON.stringify(userData));
// 						jwtService.setSession(res.data.access_token);
// 						let current_time = new Date().getTime()
// 						let expired_time = current_time + 600000
// 						// /////// extend expired_time time with 10 min ( 600000 )
// 						localStorage.setItem("expired_time", expired_time);
// 					})
// 					.catch(error => {
// 						jwtService.logout(null);
// 						console.log("OUTTTTTTTTTTTTTT")
// 						localStorage.clear();
// 						// history.push('/login')
// 					})
// 				// }
// 			}
// 		}
// 	}, 1 * 60000);	// 60000  1 min
// } catch (error) {
// 	console.log("log Error");
// }


const App = () => {
	return (
		<AppContext.Provider
			value={{
				routes
			}}
		>
			<StylesProvider jss={jss} generateClassName={generateClassName}>
				<Provider store={store}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Auth>
							<Router history={history}>
								<FuseAuthorization>
									<FuseTheme>
										<SnackbarProvider
											maxSnack={5}
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'right'
											}}
											classes={{
												containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99'
											}}
										>
											<FuseLayout />
										</SnackbarProvider>
									</FuseTheme>
								</FuseAuthorization>
							</Router>
						</Auth>
					</MuiPickersUtilsProvider>
				</Provider>
			</StylesProvider>
		</AppContext.Provider>
	);
};

export default App;
