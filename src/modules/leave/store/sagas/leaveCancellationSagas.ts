import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import {
  LeaveCancellationAction as Action,
  leaveCancellationGetAllError,
  leaveCancellationGetAllRequest,
  leaveCancellationGetAllSuccess,
  leaveCancellationGetByIdError,
  leaveCancellationGetByIdRequest,
  leaveCancellationGetByIdSuccess,
  leaveCancellationPostError,
  leaveCancellationPostRequest,
  leaveCancellationPostSuccess,
} from '@leave/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof leaveCancellationGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/cancellations/leave?${params}`,
      successEffects: (response: IApiResponse) => [
        put(leaveCancellationGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ],
      failureEffects: (response: IApiResponse) => [
        put(leaveCancellationGetAllError(response.body)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ],
      errorEffects: (error: TypeError) => [
        put(leaveCancellationGetAllError(error.message)),
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
  const worker = (action: ReturnType<typeof leaveCancellationGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/cancellations/leave/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.leaveUid}`,
      successEffects: (response: IApiResponse) => [
        put(leaveCancellationGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(leaveCancellationGetByIdError(response.statusText)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ],
      errorEffects: (error: TypeError) => [
        put(leaveCancellationGetByIdError(error.message)),
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
  const worker = (action: ReturnType<typeof leaveCancellationPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/cancellations/leave/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.leaveUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(leaveCancellationPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(leaveCancellationPostError(response.statusText))
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
        put(leaveCancellationPostError(error.message)),
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

function* leaveCancellationSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
  ]);
}

export default leaveCancellationSagas;