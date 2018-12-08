import { takeEvery, put, select } from 'redux-saga/effects';
import { constants } from '@view/info/store';
import axios from 'axios';

function* getUserInfo({ userName }) {
  const res = yield axios.get(`user/${userName}`);
  const resCollect = yield axios.get(`topic_collect/${userName}`);
  yield put({
    type: constants.GET_INFO_DATA_SAGA,
    userInfo: res.data.data,
    userCollection: resCollect.data.data,
  });
}

function* getUnReadNum() {
  const state = yield select();
  const accesstoken = yield state.getIn(['login', 'loginUser', 'accessToken']);
  const res = yield axios.get(`message/count?accesstoken=${accesstoken}`);
  yield put({
    type: constants.GET_UNREAD_NUM_SAGA,
    count: res.data.data,
  });
}

function* getUserMsg() {
  const state = yield select();
  const accesstoken = yield state.getIn(['login', 'loginUser', 'accessToken']);
  const res = yield axios.get(`messages?accesstoken=${accesstoken}`);
  yield put({
    type: constants.GET_USER_MESSAGE_SAGA,
    userMessage: res.data.data,
  });
}

export function* userInfoSagas() {
  yield takeEvery(constants.GET_INFO_DATA, getUserInfo);
  yield takeEvery(constants.GET_UNREAD_NUM, getUnReadNum);
  yield takeEvery(constants.GET_USER_MESSAGE, getUserMsg);
}
