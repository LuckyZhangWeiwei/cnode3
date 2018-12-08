import { fromJS } from 'immutable';
import { constants } from '@view/info/store';

const defaultState = fromJS({
  userInfo: {},
  userCollection: {},
  showLoading: true,
  activeTabKey: '1',
  unreadNum: 0,
  userReadedMsg: [],
  userUnReadMsg: [],
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.GET_INFO_DATA:
      return state;
    case constants.GET_INFO_DATA_SAGA:
      return state.merge({
        userInfo: fromJS(action.userInfo),
        userCollection: fromJS(action.userCollection),
        showLoading: false,
      });
    case constants.SET_ACTIVE_TAB_KEY:
      return state.set('activeTabKey', action.tabKey);
    case constants.GET_UNREAD_NUM_SAGA:
      return state.set('unreadNum', action.count);
    case constants.GET_USER_MESSAGE_SAGA:
      return state.set('userReadedMsg', fromJS(action.userMessage.has_read_messages)).set('userUnReadMsg', fromJS(action.userMessage.hasnot_read_messages));
    case constants.CLEAR_USER_INFO:
      return state.merge({
        userInfo: {},
        userCollection: {},
        showLoading: true,
      });
    default: return state;
  }
};
