import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { callApi } from '../../../../utils';
import { NotificationAction } from '../../types';
import { notificationFetchError, notificationFetchRequest, notificationFetchSuccess } from '../actions';

const API_ENDPOINT = process.env.REACT_APP_API_URL || '';

function* handleFetch(action: ReturnType<typeof notificationFetchRequest>) {
  try {
    const url = `/v1/notifications?companyUid=${action.payload.companyUid}&positionUid=${action.payload.positionUid}`;
    const res = yield call(callApi, 'get', API_ENDPOINT, url);

    if (res.error) {
      yield put(notificationFetchError(res.error));
    } else {
      yield put(notificationFetchSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(notificationFetchError(err.stack!));
    } else {
      yield put(notificationFetchError('An unknown error occured.'));
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(NotificationAction.FETCH_REQUEST, handleFetch);
}

function* notificationSagas() {
  yield all([fork(watchFetchRequest)]);
}

export default notificationSagas;