import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import {
  ProjectApprovalAction as Action,
  projectApprovalGetAllDispose,
  projectApprovalGetAllError,
  projectApprovalGetAllRequest,
  projectApprovalGetAllSuccess,
  projectApprovalGetByIdDispose,
  projectApprovalGetByIdError,
  projectApprovalGetByIdRequest,
  projectApprovalGetByIdSuccess,
  projectApprovalPostError,
  projectApprovalPostRequest,
  projectApprovalPostSuccess,
} from '@project/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof projectApprovalGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/approvals/project?${params}`,
      successEffects: (response: IApiResponse) => [
        put(projectApprovalGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(projectApprovalGetAllError(response)),
      ],
      errorEffects: (error: TypeError) => [
        put(projectApprovalGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof projectApprovalGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/approvals/project/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.projectUid}`,
      successEffects: (response: IApiResponse) => [
        put(projectApprovalGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(projectApprovalGetByIdError(response)),
      ],
      errorEffects: (error: TypeError) => [
        put(projectApprovalGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof projectApprovalPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/approvals/project/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.projectUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(projectApprovalGetAllDispose()),
        put(projectApprovalGetByIdDispose()),
        put(projectApprovalPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(projectApprovalPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(projectApprovalPostError(error.message)),
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

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(projectApprovalGetAllDispose()),
      put(projectApprovalGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* projectApprovalSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchSwitchAccess)
  ]);
}

export default projectApprovalSagas;