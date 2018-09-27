import {
  ProjectAction,
  projectGetAllError,
  projectGetAllRequest,
  projectGetAllSuccess,
  projectGetByIdRequest,
  projectGetByIdError,
  projectGetByIdSuccess,
} from '@project/store/actions';
import { callApi } from '@utils/api';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { objectToQuerystring } from 'utils';
import { listBarLoading, listBarMetadata } from '@layout/store/actions';

const API_ENDPOINT = process.env.REACT_APP_API_URL || '';

function* handleAllFetch(action: ReturnType<typeof projectGetAllRequest>) {
  try {
    const response = yield call(callApi, 'get', API_ENDPOINT, `/v1/project/registrations/${action.payload.companyUid}/${action.payload.positionUid}` + objectToQuerystring(action.payload.filter));
    
    if (response instanceof Response) {
      yield put(projectGetAllError(`${response.status}: ${response.statusText}`));
    } else {
      yield put(projectGetAllSuccess(response));
      yield put(listBarMetadata(response.metadata));
    }

  } catch (error) {
    if (error instanceof Error) {
      yield put(projectGetAllError(error.stack!));
    } else {
      yield put(projectGetAllError('An unknown error occured.'));
    }
  } finally {
    yield put(listBarLoading(false));
  }
}

function* handleFetch(action: ReturnType<typeof projectGetByIdRequest>) {
  try {
    const response = yield call(callApi, 'get', API_ENDPOINT, `/v1/project/registrations/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.projectUid}`);
    
    if (response instanceof Response) {
      yield put(projectGetByIdError(`${response.status}: ${response.statusText}`));
    } else {
      yield put(projectGetByIdSuccess(response));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(projectGetByIdError(error.stack!));
    } else {
      yield put(projectGetByIdError('An unknown error occured.'));
    }
  }
}

function* watchAllFetchRequest() {
  yield takeEvery(ProjectAction.GET_ALL_REQUEST, handleAllFetch);
}

function* watchByIdFetchRequest() {
  yield takeEvery(ProjectAction.GET_BY_ID_REQUEST, handleFetch);
}

function* projectSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest)
  ]);
}

export default projectSagas;