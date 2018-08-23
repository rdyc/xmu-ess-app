import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { AppUserActionTypes } from './types';
import { fetchError, fetchSuccess } from './actions';
import callApi from '../../utils/api';

const API_ENDPOINT = process.env.REACT_APP_API_URL || '';

function* handleFetch() {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi, 'get', API_ENDPOINT, '/account/employee/my');

    if (res.error) {
      yield put(fetchError(res.error));
    } else {
      yield put(fetchSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(AppUserActionTypes.FETCH_REQUEST, handleFetch);
}

function* appUserSaga() {
  yield all([fork(watchFetchRequest)]);
}

export default appUserSaga;