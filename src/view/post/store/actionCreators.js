import { constants } from '@view/post/store';

export const postTopic = (data, func) => ({
  type: constants.POSTARTICLE,
  data,
  func,
});

export const postTopicSaga = res => ({
  type: constants.POSTARTICLE_SAGA,
  res,
});
