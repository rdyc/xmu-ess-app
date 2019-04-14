import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import {
  ProjectAcceptanceAction as Action,
  projectAcceptanceGetAllDispose,
  projectAcceptanceGetAllError,
  projectAcceptanceGetAllRequest,
  projectAcceptanceGetAllSuccess,
  projectAcceptanceGetByIdDispose,
  projectAcceptanceGetByIdError,
  projectAcceptanceGetByIdRequest,
  projectAcceptanceGetByIdSuccess,
  projectAcceptancePostError,
  projectAcceptancePostRequest,
  projectAcceptancePostSuccess,
  projectAssignmentGetByIdDispose,
} from '@project/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof projectAcceptanceGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/project/assignments/acceptances?${params}`,
      successEffects: (response: IApiResponse) => [
        put(projectAcceptanceGetAllSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(projectAcceptanceGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(projectAcceptanceGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof projectAcceptanceGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/project/assignments/acceptances/${action.payload.assignmentUid}/${action.payload.assignmentItemUid}`,
      successEffects: (response: IApiResponse) => [
        put(projectAcceptanceGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(projectAcceptanceGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(projectAcceptanceGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof projectAcceptancePostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/project/assignments/acceptances/${action.payload.assignmentUid}/${action.payload.assignmentItemUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(projectAcceptanceGetAllDispose()),
        put(projectAcceptanceGetByIdDispose()),
        put(projectAssignmentGetByIdDispose()),
        put(projectAcceptancePostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(projectAcceptancePostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(projectAcceptancePostError(error.message)),
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
      put(projectAcceptanceGetAllDispose()),
      put(projectAcceptanceGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* projectAcceptanceSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchSwitchAccess),
  ]);
}

export default projectAcceptanceSagas;