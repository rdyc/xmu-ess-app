import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import {
  ProjectAssignmentAction as Action,
  projectAssignmentGetAllError,
  projectAssignmentGetAllRequest,
  projectAssignmentGetAllSuccess,
  projectAssignmentGetByIdError,
  projectAssignmentGetByIdRequest,
  projectAssignmentGetByIdSuccess,
  projectAssignmentGetListError,
  projectAssignmentGetListRequest,
  projectAssignmentGetListSuccess,
  projectAssignmentPatchError,
  projectAssignmentPatchRequest,
  projectAssignmentPatchSuccess,
} from '@project/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof projectAssignmentGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/project/assignments${objectToQuerystring(action.payload.filter)}`,
      successEffects: (response: IApiResponse) => [
        put(projectAssignmentGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ],
      failureEffects: (response: IApiResponse) => [
        put(projectAssignmentGetAllError(response.body)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ],
      errorEffects: (error: TypeError) => [
        put(projectAssignmentGetAllError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ],
      finallyEffects: [put(listBarLoading(false))]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetListRequest() {
  const worker = (action: ReturnType<typeof projectAssignmentGetListRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/project/assignments/list${objectToQuerystring(action.payload.filter)}`,
      successEffects: (response: IApiResponse) => [
        put(projectAssignmentGetListSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(projectAssignmentGetListError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ],
      errorEffects: (error: TypeError) => [
        put(projectAssignmentGetListError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
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
        put(projectAssignmentGetByIdError(response.statusText)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ],
      errorEffects: (error: TypeError) => [
        put(projectAssignmentGetByIdError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
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

function* projectAssignmentSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetListRequest),
    fork(watchGetByIdRequest),
    fork(watchPatchRequest)
  ]);
}

export default projectAssignmentSagas;