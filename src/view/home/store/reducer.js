import { fromJS } from 'immutable';
import { constants } from '@view/home/store';

const defaultState = fromJS({
  topicList: [],
  loading: true,
  pageInfo: {
    selectedTab: 'all',
    pageIndex: 1,
    isReset: true,
    hasMore: true,
  },
  scrollDirection: '',
  scrollDistence: 0,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.UPDATE_PAGE_INFO:
      return state.merge({
        pageInfo: action.payLoad.pageInfo,
      });
    case constants.GET_HOME_DATA:
      return state.merge({
        loading: true,
      });
    case constants.GET_HOME_DATA_SAGA:
      const isReset = state.get('pageInfo').get('isReset');
      if (isReset) {
        return state.merge({
          topicList: fromJS(action.payLoad.topicList),
          loading: false,
          pageInfo: action.payLoad.topicList.length < 10 ?
            state.get('pageInfo').set('hasMore', false)
            :
            state.get('pageInfo').set('hasMore', true),
        });
      }
      return state.merge({
        topicList: state.get('topicList').concat(fromJS(action.payLoad.topicList)),
        loading: false,
        pageInfo: action.payLoad.topicList.length < 10 ?
          state.get('pageInfo').set('hasMore', false)
          :
          state.get('pageInfo').set('hasMore', true),
      });
    case constants.UPDATE_SCROLL_DIRECTION:
      return state.set('scrollDirection', action.direction);
    case constants.UPDATE_SCROLL_DISTENCE:
      return state.set('scrollDistence', action.value);
    default: return state;
  }
};
