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
import { setAlertSnackbar } from '../../@layout';

const API_ENDPOINT = process.env.REACT_APP_API_URL || '';

const url = (uid: string) => `/v1/account/employees/${uid}`;

//#region Handlers
function* handleFetch(action: ReturnType<typeof EmployeeProfileFetchRequest>) {
  try {
    const response = yield call(callApi, 'get', API_ENDPOINT, url(action.payload.uid));
    
    if (response instanceof Response) {
      yield put(EmployeeProfileFetchError(`${response.status}: ${response.statusText}`));
    } else {
      yield put(EmployeeProfileFetchSuccess(response));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(EmployeeProfileFetchError(error.stack!));
    } else {
      yield put(EmployeeProfileFetchError('An unknown error occured.'));
    }
  }
}

function* handleCommand(action: ReturnType<typeof EmployeeProfileCommandRequest>) {
  try {
    const response = yield call(callApi, action.payload.method, API_ENDPOINT, url(action.payload.uid), action.payload.data);

    if (response instanceof Response) {
      yield put(EmployeeProfileCommandError(`${response.status} ${response.statusText} | ${response.headers.get('Date')} | ${response.headers.get('X-Correlation-Id')}`));
      yield put(setAlertSnackbar({ open: true, message: `${response.status} ${response.statusText}` }));
    } else {
      yield put(EmployeeProfileCommandSuccess(response));
    }
  } catch (error) {
    let _error: string;

    if (error instanceof Error) {
      _error = error.stack!;
    } else {
      _error = 'An unknown error occured.';
    }
    
    yield put(EmployeeProfileCommandError(_error));
    yield put(setAlertSnackbar({ open: true, message: _error }));
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