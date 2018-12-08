import { constants } from '@view/home/store';

export const GetHomeData = res => ({
  type: constants.GET_HOME_DATA,
  fun: res,
});

export const ReturnHomeDataFromSaga = topics => ({
  type: constants.GET_HOME_DATA_SAGA,
  payLoad: { topicList: topics, loading: false },
});

export const UpdatePageInfo = pageInfo => ({
  type: constants.UPDATE_PAGE_INFO,
  payLoad: { pageInfo },
});

export const UpdateScrollDirection = direction => ({
  type: constants.UPDATE_SCROLL_DIRECTION,
  direction,
});
