import { takeEvery, put, select } from 'redux-saga/effects';
import { constants } from '@view/detail/store';
import axios from 'axios';

function* getDetail({ id }) {
  const state = yield select();
  const accesstoken = yield state.getIn(['login', 'isLogin']) ? state.getIn(['login', 'loginUser', 'accessToken']) : null;
  const res = yield axios.get(`https://cnodejs.org/api/v1/topic/${id}${accesstoken ? `?accesstoken=${accesstoken}` : ''}`);
  yield put({ type: constants.GET_DETAIL_DATA_SAGA, detail: res.data.data });
}

function* collectArticle({ articleId, isCollect }) {
  const state = yield select();
  const accesstoken = yield state.getIn(['login', 'loginUser', 'accessToken']);
  yield axios.post(`https://cnodejs.org/api/v1/topic_collect/${isCollect ? 'de_collect' : 'collect'}`, {
    accesstoken,
    topic_id: articleId,
  });
  yield put({ type: constants.COLLECT_ARTICLE_SAGA, collectStatus: !isCollect });
}

function* like({ replyId }) {
  const state = yield select();
  const accesstoken = yield state.getIn(['login', 'loginUser', 'accessToken']);
  const userId = yield state.getIn(['login', 'loginUser', 'id']);
  yield axios.post(`https://cnodejs.org/api/v1/reply/${replyId}/ups`, {
    accesstoken,
  });
  yield put({ type: constants.LIKE_SAGA, replyId, userId });
}

function* postComment({ topicId, content }) {
  const state = yield select();
  const loginUser = yield state.getIn(['login', 'loginUser']).toJS();
  const accesstoken = loginUser.accessToken;
  const res = yield axios.post(`https://cnodejs.org/api/v1/topic/${topicId}/replies`, {
    accesstoken,
    content,
  });
  const reply = {
    author: loginUser,
    id: res.data.reply_id,
    content: `<div class="markdown-text"><p>${content}</p></div>`,
    ups: [],
    create_at: new Date(),
    is_uped: false,
    reply_id: null,
  };
  yield put({
    type: constants.POST_COMMENT_SAGA,
    reply,
  });
}

function* markToRead({ topicId }) {
  const state = yield select();
  const accesstoken = yield state.getIn(['login', 'loginUser', 'accessToken']);
  yield axios.post(`https://cnodejs.org/api/v1/message/mark_one/${topicId}`, {
    accesstoken,
  });
  yield put({
    type: constants.MARK_TO_READ_SAGA,
    topicId,
  });
}

export function* detailSagas() {
  yield takeEvery(constants.GET_DETAIL_DATA, getDetail);
  yield takeEvery(constants.COLLECT_ARTICLE, collectArticle);
  yield takeEvery(constants.LIKE, like);
  yield takeEvery(constants.POST_COMMENT, postComment);
  yield takeEvery(constants.MARK_TO_READ, markToRead);
}
