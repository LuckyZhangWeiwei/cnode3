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

export const postComment = (topicId, content) => ({
  type: constants.POST_COMMENT,
  topicId,
  content,
});

export const postCommentFromSaga = replyId => ({
  type: constants.POST_COMMENT_SAGA,
  replyId,
});

export const markToRead = topicId => ({
  type: constants.MARK_TO_READ,
  topicId,
});
