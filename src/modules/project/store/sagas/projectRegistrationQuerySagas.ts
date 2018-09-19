import {
  ProjectRegistrationAllAction,
  ProjectRegistrationFetchAllError,
  ProjectRegistrationFetchAllRequest,
  ProjectRegistrationFetchAllSuccess,
  ProjectRegistrationFetchRequest,
  ProjectRegistrationAction,
  ProjectRegistrationFetchError,
  ProjectRegistrationFetchSuccess,
} from '@project/store/actions';
import { callApi } from '@utils/api';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { objectToQuerystring } from 'utils';
import { setListBarReload, setListBarMetadata } from '@layout/store/actionCreators';

const API_ENDPOINT = process.env.REACT_APP_API_URL || '';

function* handleAllFetch(action: ReturnType<typeof ProjectRegistrationFetchAllRequest>) {
  try {
    const response = yield call(callApi, 'get', API_ENDPOINT, `/v1/project/registrations/${action.payload.companyUid}/${action.payload.positionUid}` + objectToQuerystring(action.payload.filter));
    
    if (response instanceof Response) {
      yield put(ProjectRegistrationFetchAllError(`${response.status}: ${response.statusText}`));
    } else {
      yield put(ProjectRegistrationFetchAllSuccess(response));
      yield put(setListBarMetadata(response.metadata));
    }

  } catch (error) {
    if (error instanceof Error) {
      yield put(ProjectRegistrationFetchAllError(error.stack!));
    } else {
      yield put(ProjectRegistrationFetchAllError('An unknown error occured.'));
    }
  } finally {
    yield put(setListBarReload(false));
  }
}

function* handleFetch(action: ReturnType<typeof ProjectRegistrationFetchRequest>) {
  try {
    const response = yield call(callApi, 'get', API_ENDPOINT, `/v1/project/registrations/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.projectUid}`);
    
    if (response instanceof Response) {
      yield put(ProjectRegistrationFetchError(`${response.status}: ${response.statusText}`));
    } else {
      yield put(ProjectRegistrationFetchSuccess(response));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(ProjectRegistrationFetchError(error.stack!));
    } else {
      yield put(ProjectRegistrationFetchError('An unknown error occured.'));
    }
  }
}

function* watchAllFetchRequest() {
  yield takeEvery(ProjectRegistrationAllAction.FETCH_REQUEST, handleAllFetch);
}

function* watchFetchRequest() {
  yield takeEvery(ProjectRegistrationAction.FETCH_REQUEST, handleFetch);
}

function* projectRegistrationQuerySagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchFetchRequest)
  ]);
}

export default projectRegistrationQuerySagas;