import { takeEvery, put } from 'redux-saga/effects';
import { constants } from '@view/post/store';
import axios from 'axios';
import { getStore } from '@script/utils';

function* postArticle({ data }) {
  const postData = {
    accesstoken: getStore('loginUserInfo').accessToken,
    title: data.title,
    tab: data.tab,
    content: data.des,
  };
  const res = yield axios.post('/topics', postData);
  yield res.data = {
    ...data,
    topicId: res.data.topic_id,
  };
  yield put({
    type: constants.POSTARTICLE_SAGA,
    topic: res.data,
  });
}

export function* postArticleSagas() {
  yield takeEvery(constants.POSTARTICLE, postArticle);
}
