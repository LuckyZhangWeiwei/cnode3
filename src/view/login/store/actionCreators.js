import { constants } from '@view/login/store';

export const Login = accessToken => ({
  type: constants.LOGIN,
  accessToken,
});

export const loginSaga = res => ({
  type: constants.LOGIN_SAGA,
  res,
});

export const logOut = () => ({
  type: constants.LOGOUT,
});
