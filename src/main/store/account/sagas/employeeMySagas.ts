import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { EmployeeFetchError, EmployeeFetchSuccess } from '../actions/employeeMyActions';
import callApi from '../../../utils/api';
import { EmployeeMyAction } from '../actions/employeeMyActions';

const API_ENDPOINT = process.env.REACT_APP_API_URL || '';

function* handleFetch() {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi, 'get', API_ENDPOINT, '/v1/account/employees/my');

    yield put(EmployeeFetchSuccess(res));
  } catch (err) {
    if (err instanceof TypeError) {
      yield put(EmployeeFetchError(err.stack!));
    } else {
      yield put(EmployeeFetchError('An unknown error occured.'));
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(EmployeeMyAction.FETCH_REQUEST, handleFetch);
}

function* employeeMySagas() {
  yield all([fork(watchFetchRequest)]);
}

export default employeeMySagas;