import { all, fork } from 'redux-saga/effects';
import { homeSagas } from '@view/home/store';
import { detailSagas } from '@view/detail/store';
import { loginSagas } from '@view/login/store';
import { infoSagas } from '@view/info/store';
import { postSagas } from '@view/post/store';

export default function* rootSaga() {
  yield all([
    fork(homeSagas.homeSagas),
    fork(detailSagas.detailSagas),
    fork(loginSagas.loginSagas),
    fork(infoSagas.userInfoSagas),
    fork(postSagas.postArticleSagas),
  ]);
}
