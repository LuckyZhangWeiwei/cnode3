import { constants } from '@view/detail/store';

export const GetDetail = id => ({
  type: constants.GET_DETAIL_DATA,
  id,
});

export const GetDetailDataFromSaga = detail => ({
  type: constants.GET_DETAIL_DATA_SAGA,
  detail,
});

export const collect = (articleId, isCollect) => ({
  type: constants.COLLECT_ARTICLE,
  articleId,
  isCollect,
});

export const like = replyId => ({
  type: constants.LIKE,
  replyId,
});

export const clearDetail = () => ({
  type: constants.CLEAR_DETAIL_DATA,
});
