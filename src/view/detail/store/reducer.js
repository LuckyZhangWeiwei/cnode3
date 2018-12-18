import { fromJS } from 'immutable';
import { constants } from '@view/detail/store';

const defaultState = fromJS({
  detail: {},
  showLoading: true,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.GET_DETAIL_DATA:
      return state;
    case constants.GET_DETAIL_DATA_SAGA:
      return state.merge({
        detail: fromJS(action.detail),
        showLoading: false,
      });
    case constants.COLLECT_ARTICLE_SAGA:
      return state.setIn(['detail', 'is_collect'], action.collectStatus);
    case constants.LIKE_SAGA:
      const { replyId, userId } = action;
      const index = state.getIn(['detail', 'replies']).findIndex(listItem => listItem.get('id') === replyId);
      const updateItem = state.getIn(['detail', 'replies', index]).toJS();
      const upsIndex = updateItem.ups.findIndex(p => p === userId);
      if (upsIndex >= 0) {
        updateItem.ups.splice(upsIndex, 1);
      } else {
        updateItem.ups.push(userId);
      }
      const updatedState = state.setIn(['detail', 'replies', index, 'ups'], fromJS(updateItem.ups)).setIn(['detail', 'replies', index, 'is_uped'], !updateItem.is_uped);
      return updatedState;
    case constants.CLEAR_DETAIL_DATA:
      return state.merge({
        detail: {},
        showLoading: true,
      });
    case constants.POST_COMMENT_SAGA:
      const replies = state.getIn(['detail', 'replies']).toJS();
      replies.push(action.reply);
      return state.setIn(['detail', 'replies'], fromJS(replies));
    case constants.MARK_TO_READ_SAGA:
      let unreadNum = state.getIn(['userInfo', 'unreadNum']);
      unreadNum = unreadNum > 0 ? unreadNum - 1 : 0;
      return state.setIn(['userInfo', unreadNum]);
    default: return state;
  }
};
