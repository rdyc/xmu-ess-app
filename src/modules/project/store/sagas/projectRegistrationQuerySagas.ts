import {
  ProjectRegistrationAllAction,
  ProjectRegistrationFetchAllError,
  ProjectRegistrationFetchAllRequest,
  ProjectRegistrationFetchAllSuccess,
} from '@project/store/actions';
import { callApi } from '@utils/api';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { objectToQuerystring } from 'utils';

const API_ENDPOINT = process.env.REACT_APP_API_URL || '';

function* handleAllFetch(action: ReturnType<typeof ProjectRegistrationFetchAllRequest>) {
  try {
    const response = yield call(callApi, 'get', API_ENDPOINT, `/v1/project/registrations/${action.payload.companyUid}/${action.payload.positionUid}` + objectToQuerystring(action.payload.filter));
    
    if (response instanceof Response) {
      yield put(ProjectRegistrationFetchAllError(`${response.status}: ${response.statusText}`));
    } else {
      yield put(ProjectRegistrationFetchAllSuccess(response));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(ProjectRegistrationFetchAllError(error.stack!));
    } else {
      yield put(ProjectRegistrationFetchAllError('An unknown error occured.'));
    }
  }
}

function* watchAllFetchRequest() {
  yield takeEvery(ProjectRegistrationAllAction.FETCH_REQUEST, handleAllFetch);
}

function* projectRegistrationQuerySagas() {
  yield all([
    fork(watchAllFetchRequest)
  ]);
}

export default projectRegistrationQuerySagas;