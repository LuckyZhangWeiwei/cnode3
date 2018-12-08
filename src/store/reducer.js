import { combineReducers } from 'redux-immutable';
import { reducer as homeReducer } from '@view/home/store';
import { reducer as detailReducer } from '@view/detail/store';
import { reducer as loginReducer } from '@view/login/store';
import { reducer as userInfoReducer } from '@view/info/store';

export default combineReducers({
  home: homeReducer,
  detail: detailReducer,
  login: loginReducer,
  userInfo: userInfoReducer,
});
