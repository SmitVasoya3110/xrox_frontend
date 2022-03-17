import Error404PageConfig from 'app/main/errors/404/Error404PageConfig';
import LoginPageConfig from '../Login/LoginPageConfig';
import RegisterConfig from '../register/RegisterConfig';
import Register3PageConfig from '../register-3/Register3PageConfig';

import customerAppConfigs from './CustomerMaster/customerAppConfig';
import ResetPasswordPageConfig from '../Reset_Password/ResetPasswordConfig'
import CartAppConfigs from './cartMaster/cartAppConfig';

const appsConfigs = [
	Error404PageConfig,
	LoginPageConfig,
	RegisterConfig,
	Register3PageConfig,
	
	customerAppConfigs,
	ResetPasswordPageConfig,
	CartAppConfigs
	
];

export default appsConfigs;
