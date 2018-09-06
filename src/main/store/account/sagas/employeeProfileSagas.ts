import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { 
  EmployeeProfileFetchError, 
  EmployeeProfileFetchSuccess, 
  EmployeeProfileFetchRequest, 
  EmployeeProfileCommandSuccess, 
  EmployeeProfileCommandError,
  EmployeeProfileCommandRequest } from '../actions/employeeProfileActions';
import callApi from '../../../utils/api';
import { EmployeeProfileAction } from '../actions/employeeProfileActions';

const API_ENDPOINT = process.env.REACT_APP_API_URL || '';

const url = (uid: string) => `/v1/account/employees/${uid}`;

//#region Handlers
function* handleFetch(action: ReturnType<typeof EmployeeProfileFetchRequest>) {
  try {
    const res = yield call(callApi, 'get', API_ENDPOINT, url(action.payload.uid));
    
    if (res.error) {
      yield put(EmployeeProfileFetchError(res.statusText));
    } else {
      yield put(EmployeeProfileFetchSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(EmployeeProfileFetchError(err.stack!));
    } else {
      yield put(EmployeeProfileFetchError('An unknown error occured.'));
    }
  }
}

function* handleCommand(action: ReturnType<typeof EmployeeProfileCommandRequest>) {
  try {
    const res = yield call(callApi, action.payload.method, API_ENDPOINT, url(action.payload.uid), action.payload.data);

    if (res.error) {
      yield put(EmployeeProfileCommandError(res.error));
    } else {
      yield put(EmployeeProfileCommandSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(EmployeeProfileCommandError(err.stack!));
    } else {
      yield put(EmployeeProfileCommandError('An unknown error occured.'));
    }
  }
}
//#endregion

//#region Wathcers
function* watchFetchRequest() {
  yield takeEvery(EmployeeProfileAction.FETCH_REQUEST, handleFetch);
}

function* watchCommandRequest() {
  yield takeEvery(EmployeeProfileAction.COMMAND_REQUEST, handleCommand);
}
//#endregion

function* employeeProfileSagas() {
  yield all([
    fork(watchFetchRequest),
    fork(watchCommandRequest)
  ]);
}

export default employeeProfileSagas;