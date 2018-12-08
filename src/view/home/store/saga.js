import { takeEvery, put, select } from 'redux-saga/effects';
import { constants, actionCreators } from '@view/home/store';
import axios from 'axios';

function* getTopicList({ fun }) {
  try {
    const state = yield select();
    const pageInfo = state.get('home').get('pageInfo');
    const res = yield axios.get('topics', {
      params: {
        page: pageInfo.get('pageIndex'),
        tab: pageInfo.get('selectedTab'),
        limit: 10,
      },
    });
    const action = actionCreators.ReturnHomeDataFromSaga(res.data.data);
    yield put(action);
    if (fun) {
      fun();
    }
  } catch (e) {
    alert(e);
  }
}

export function* homeSagas() {
  yield takeEvery(constants.GET_HOME_DATA, getTopicList);
}
