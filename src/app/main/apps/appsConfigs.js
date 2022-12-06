import Error404PageConfig from "app/main/errors/404/Error404PageConfig";
import LoginPageConfig from "../Login/LoginPageConfig";
import Register3PageConfig from "../register-3/Register3PageConfig";
import HomePageConfig from "../Home/HomePageConfig";

import customerAppConfigs from "./CustomerMaster/customerAppConfig";
import ResetPasswordPageConfig from "../Reset_Password/ResetPasswordConfig";
import CartAppConfigs from "./cartMaster/cartAppConfig";
import userRouteConfigs from "./user/userRouteConfig";

const appsConfigs = [
  Error404PageConfig,
  LoginPageConfig,
  Register3PageConfig,
  HomePageConfig,

  customerAppConfigs,
  ResetPasswordPageConfig,
  CartAppConfigs,
  userRouteConfigs,
];

export default appsConfigs;
