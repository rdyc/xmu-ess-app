import {
  EmployeeAction,
  employeeGetAllError,
  employeeGetAllRequest,
  employeeGetAllSuccess,
  employeeGetByIdError,
  employeeGetByIdRequest,
  employeeGetByIdSuccess,
  employeeGetListError,
  employeeGetListRequest,
  employeeGetListSuccess,
} from '@account/store/actions';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { callApi, objectToQuerystring } from 'utils';

const API_ENDPOINT = process.env.REACT_APP_API_URL || '';

function* handleAllFetch(action: ReturnType<typeof employeeGetAllRequest>) {
  try {
    const response = yield call(callApi, 'get', API_ENDPOINT, '/v1/account/employees' + objectToQuerystring(action.payload.filter));
    
    if (response instanceof Response) {
      yield put(employeeGetAllError(`${response.status}: ${response.statusText}`));
    } else {
      yield put(employeeGetAllSuccess(response));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(employeeGetAllError(err.stack!));
    } else {
      yield put(employeeGetAllError('An unknown error occured.'));
    }
  }
}

function* handleListFetch(action: ReturnType<typeof employeeGetListRequest>) {
  try {
    const response = yield call(callApi, 'get', API_ENDPOINT, '/v1/account/employees/list' + objectToQuerystring(action.payload.filter));
    
    if (response instanceof Response) {
      yield put(employeeGetListError(`${response.status}: ${response.statusText}`));
    } else {
      yield put(employeeGetListSuccess(response));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(employeeGetListError(err.stack!));
    } else {
      yield put(employeeGetListError('An unknown error occured.'));
    }
  }
}

function* handleByIdFetch(action: ReturnType<typeof employeeGetByIdRequest>) {
  try {
    const response = yield call(callApi, 'get', API_ENDPOINT, '/v1/account/employees/' + action.payload.employeeUid);
    
    if (response instanceof Response) {
      yield put(employeeGetByIdError(`${response.status}: ${response.statusText}`));
    } else {
      yield put(employeeGetByIdSuccess(response));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(employeeGetByIdError(err.stack!));
    } else {
      yield put(employeeGetByIdError('An unknown error occured.'));
    }
  }
}

function* watchFetchAllRequest() {
  yield takeEvery(EmployeeAction.GET_ALL_REQUEST, handleAllFetch);
}

function* watchFetchListRequest() {
  yield takeEvery(EmployeeAction.GET_LIST_REQUEST, handleListFetch);
}

function* watchFetchByIdRequest() {
  yield takeEvery(EmployeeAction.GET_BY_ID_REQUEST, handleByIdFetch);
}

function* employeeSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default employeeSagas;