import { takeEvery, put } from 'redux-saga/effects';
import { constants } from '@view/login/store';
import axios from 'axios';
import { setStore, removeStore } from '@script/utils';

function* login({ accessToken }) {
  try {
    const res = yield axios.post('accesstoken', {
      accesstoken: accessToken,
    });
    yield res.data.accessToken = accessToken;
    yield put({ type: constants.LOGIN_SAGA, userInfo: res });
    setStore('loginUserInfo', res.data);
  } catch (e) {
    yield put({ type: constants.LOGIN_SAGA, userInfo: { data: { success: false } } });
  }
}

function* logout({ fun }) {
  yield removeStore('loginUserInfo');
  yield fun && fun();
  yield put({ type: constants.LOGOUT_SAGA });
}

export function* loginSagas() {
  yield takeEvery(constants.LOGIN, login);
  yield takeEvery(constants.LOGOUT, logout);
}
