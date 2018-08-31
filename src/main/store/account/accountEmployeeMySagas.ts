import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { accountEmployeeFetchError, accountEmployeeFetchSuccess } from './accountEmployeeActions';
import callApi from '../../utils/api';
import { AccountEmployeeAction } from './actions/AccountEmployeeAction';

const API_ENDPOINT = process.env.REACT_APP_API_URL || '';

function* handleFetch() {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi, 'get', API_ENDPOINT, '/v1/account/employees/my');

    if (res.error) {
      yield put(accountEmployeeFetchError(res.error));
    } else {
      yield put(accountEmployeeFetchSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(accountEmployeeFetchError(err.stack!));
    } else {
      yield put(accountEmployeeFetchError('An unknown error occured.'));
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(AccountEmployeeAction.FETCH_REQUEST, handleFetch);
}

function* accountEmployeeMySagas() {
  yield all([fork(watchFetchRequest)]);
}

export default accountEmployeeMySagas;