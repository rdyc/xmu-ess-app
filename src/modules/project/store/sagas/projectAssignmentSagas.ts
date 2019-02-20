import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import {
  ProjectAssignmentAction as Action,
  projectAssignmentGetAllDispose,
  projectAssignmentGetAllError,
  projectAssignmentGetAllRequest,
  projectAssignmentGetAllSuccess,
  projectAssignmentGetByIdDispose,
  projectAssignmentGetByIdError,
  projectAssignmentGetByIdRequest,
  projectAssignmentGetByIdSuccess,
  projectAssignmentGetListDispose,
  projectAssignmentGetListError,
  projectAssignmentGetListRequest,
  projectAssignmentGetListSuccess,
  projectAssignmentPatchError,
  projectAssignmentPatchRequest,
  projectAssignmentPatchSuccess,
} from '@project/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof projectAssignmentGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/project/assignments?${params}`,
      successEffects: (response: IApiResponse) => [
        put(projectAssignmentGetAllSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(projectAssignmentGetAllError(response)),
      ],
      errorEffects: (error: TypeError) => [
        put(projectAssignmentGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetListRequest() {
  const worker = (action: ReturnType<typeof projectAssignmentGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true,
      indices: false
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/project/assignments/list?${params}`,
      successEffects: (response: IApiResponse) => [
        put(projectAssignmentGetListSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(projectAssignmentGetListError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(projectAssignmentGetListError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof projectAssignmentGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/project/assignments/${action.payload.companyUid}/${action.payload.assignmentUid}`,
      successEffects: (response: IApiResponse) => [
        put(projectAssignmentGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(projectAssignmentGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(projectAssignmentGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPatchRequest() {
  const worker = (action: ReturnType<typeof projectAssignmentPatchRequest>) => {
    return saiyanSaga.fetch({
      method: 'patch',
      path: `/v1/project/assignments/${action.payload.companyUid}/${action.payload.projectUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(projectAssignmentGetByIdDispose()),
        put(projectAssignmentGetAllDispose()),
        put(projectAssignmentPatchSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(projectAssignmentPatchError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        if (response.status === 400) {
          const errors: any = { 
            // information -> based form section name
            information: flattenObject(response.body.errors) 
          };

          action.payload.reject(new SubmissionError(errors));
        } else {
          action.payload.reject(response.statusText);
        }
      },
      errorEffects: (error: TypeError) => [
        put(projectAssignmentPatchError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.PATCH_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(projectAssignmentGetAllDispose()),
      put(projectAssignmentGetListDispose()),
      put(projectAssignmentGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* projectAssignmentSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetListRequest),
    fork(watchGetByIdRequest),
    fork(watchPatchRequest),
    fork(watchSwitchAccess)
  ]);
}

export default projectAssignmentSagas;