import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { callApi } from '../../../../utils';
import { EmployeeFetchError, EmployeeFetchSuccess, EmployeeMyAction } from '../actionCreators/employeeMyActions';

const API_ENDPOINT = process.env.REACT_APP_API_URL || '';

function* handleFetch() {
  try {
    const response = yield call(callApi, 'get', API_ENDPOINT, '/v1/account/employees/my');
    
    if (response instanceof Response) {
      yield put(EmployeeFetchError(`${response.status}: ${response.statusText}`));
    } else {
      yield put(EmployeeFetchSuccess(response));
    }
  } catch (err) {
    if (err instanceof Error) {
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