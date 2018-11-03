import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import {
  ProjectAcceptanceAction as Action,
  projectAcceptanceGetAllError,
  projectAcceptanceGetAllRequest,
  projectAcceptanceGetAllSuccess,
  projectAcceptanceGetByIdError,
  projectAcceptanceGetByIdRequest,
  projectAcceptanceGetByIdSuccess,
  projectAcceptancePostError,
  projectAcceptancePostRequest,
  projectAcceptancePostSuccess,
} from '@project/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
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
        put(projectAcceptanceGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ],
      failureEffects: (response: IApiResponse) => [
        put(projectAcceptanceGetAllError(response.body)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ],
      errorEffects: (error: TypeError) => [
        put(projectAcceptanceGetAllError(error.message)),
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

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof projectAcceptanceGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/project/assignments/acceptances/${action.payload.assignmentUid}/${action.payload.assignmentItemUid}`,
      successEffects: (response: IApiResponse) => [
        put(projectAcceptanceGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(projectAcceptanceGetByIdError(response.statusText)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ],
      errorEffects: (error: TypeError) => [
        put(projectAcceptanceGetByIdError(error.message)),
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

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof projectAcceptancePostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/project/assignments/acceptances/${action.payload.assignmentItemUid}/${action.payload.assignmentItemUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(projectAcceptancePostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(projectAcceptancePostError(response.statusText))
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

function* projectAcceptanceSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
  ]);
}

export default projectAcceptanceSagas;