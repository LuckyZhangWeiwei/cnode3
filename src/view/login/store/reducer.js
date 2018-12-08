import { fromJS } from 'immutable';
import { constants } from '@view/login/store';
import { getStore } from '@script/utils';

const loginUserInfo = getStore('loginUserInfo');

const defaultState = fromJS({
  loginUser: fromJS(loginUserInfo),
  isLogin: loginUserInfo ? true : null,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.LOGIN_SAGA:
      const { success } = action.userInfo.data;
      if (success) {
        return state.merge({
          isLogin: true,
          loginUser: fromJS(action.userInfo.data),
        });
      }
      return state.set('isLogin', false);
    case constants.LOGOUT_SAGA:
      return fromJS({
        loginUser: fromJS({}),
        isLogin: null,
      });
    default: return state;
  }
};
