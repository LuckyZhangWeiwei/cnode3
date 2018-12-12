import { constants } from '@view/info/store';

export const GetUserInfo = userName => ({
  type: constants.GET_INFO_DATA,
  userName,
});

export const GetUserInfoFromSaga = userInfo => ({
  type: constants.GET_INFO_DATA_SAGA,
  userInfo,
});

export const SetTabKey = tabKey => ({
  type: constants.SET_ACTIVE_TAB_KEY,
  tabKey,
});

export const GetUserUnReadNum = () => ({
  type: constants.GET_UNREAD_NUM,
});

export const GetUserUnReadNumFromSaga = count => ({
  type: constants.GET_UNREAD_NUM_SAGA,
  count,
});

export const GetUserMsg = () => ({
  type: constants.GET_USER_MESSAGE,
});

export const GetUserFromSaga = userMessage => ({
  type: constants.GET_USER_MESSAGE_SAGA,
  userMessage,
});

export const ClearUserInfo = () => ({
  type: constants.CLEAR_USER_INFO,
});

export const DeclareCache = value => ({
  type: constants.DECLARE_CACHE,
  value,
});
