import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { EmployeeProfileFetchError, EmployeeProfileFetchSuccess } from '../actions/employeeProfileActions';
import callApi from '../../../utils/api';
import { EmployeeProfileAction } from '../actions/employeeProfileActions';

const API_ENDPOINT = process.env.REACT_APP_API_URL || '';

function* handleFetch() {
  try {
    const res = yield call(callApi, 'get', API_ENDPOINT, '/v1/account/employees/E0001');

    yield put(EmployeeProfileFetchSuccess(res));
  } catch (err) {
    if (err instanceof TypeError) {
      yield put(EmployeeProfileFetchError(err.stack!));
    } else {
      yield put(EmployeeProfileFetchError('An unknown error occured.'));
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(EmployeeProfileAction.FETCH_REQUEST, handleFetch);
}

function* employeeProfileSagas() {
  yield all([fork(watchFetchRequest)]);
}

export default employeeProfileSagas;