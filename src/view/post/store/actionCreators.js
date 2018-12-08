import { constants } from '@view/post/store';

export const postTopic = data => ({
  type: constants.POSTARTICLE,
  data,
});

export const postTopicSaga = res => ({
  type: constants.POSTARTICLE_SAGA,
  res,
});
