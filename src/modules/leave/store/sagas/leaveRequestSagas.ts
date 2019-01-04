import { layoutAlertAdd } from '@layout/store/actions';
import {
  LeaveRequestAction as Action,
  leaveRequestFetchError,
  leaveRequestFetchRequest,
  leaveRequestFetchSuccess,
  leaveRequestGetAllDispose,
  leaveRequestGetAllError,
  leaveRequestGetAllRequest,
  leaveRequestGetAllSuccess,
  leaveRequestGetByIdDispose,
  leaveRequestGetByIdError,
  leaveRequestGetByIdRequest,
  leaveRequestGetByIdSuccess,
  leaveRequestPostError,
  leaveRequestPostRequest,
  leaveRequestPostSuccess,
  leaveRequestPutError,
  leaveRequestPutRequest,
  leaveRequestPutSuccess,
} from '@leave/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof leaveRequestGetAllRequest>) => { 
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/leave/requests?${params}`, 
      successEffects: (response: IApiResponse) => [
        put(leaveRequestGetAllSuccess(response.body)),
      ], 
      failureEffects: (response: IApiResponse) => [
        put(leaveRequestGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ], 
      errorEffects: (error: TypeError) => [
        put(leaveRequestGetAllError(error.message)),
        put(
          layoutAlertAdd({
           time: new Date(),
           message: error.message
        }))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchByIdFetchRequest() {
  const worker = (action: ReturnType<typeof leaveRequestGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/leave/requests/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.leaveUid}`, 
      successEffects: (response: IApiResponse) => [
        put(leaveRequestGetByIdSuccess(response.body)),
      ], 
      failureEffects: (response: IApiResponse) => [
        put(leaveRequestGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ], 
      errorEffects: (error: TypeError) => [
        put(leaveRequestGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchFetchRequest() {
  const worker = (action: ReturnType<typeof leaveRequestFetchRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/leave/requests/${action.payload.start}/${action.payload.regularType}/${action.payload.companyUid}/end`, 
      successEffects: (response: IApiResponse) => [
        put(leaveRequestFetchSuccess(response.body))
      ], 
      failureEffects: (response: IApiResponse) => [
        put(leaveRequestFetchError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ], 
      errorEffects: (error: TypeError) => [
        put(leaveRequestFetchError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]
    });
  };

  yield takeEvery(Action.FETCH_REQUEST, worker);
}

function* watchPostFetchRequest() {
  const worker = (action: ReturnType<typeof leaveRequestPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/leave/requests/${action.payload.companyUid}/${action.payload.positionUid}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(leaveRequestGetAllDispose()),
        put(leaveRequestPostSuccess(response.body))
      ], 
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(leaveRequestPostError(response.statusText)),
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
        put(leaveRequestPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchPutFetchRequest() {
  const worker = (action: ReturnType<typeof leaveRequestPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/leave/requests/${action.payload.companyUid}/${action.payload.positionUid}`,
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(leaveRequestGetAllDispose()),
        put(leaveRequestGetByIdDispose()),
        put(leaveRequestPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(leaveRequestPutError(response.statusText)),
      ],
      failureCallback: (response: IApiResponse) => {
        if (response.status === 400) {
          const errors: any = { 
            // information -> based on form section name
            information: flattenObject(response.body.errors) 
          };
          
          // action.payload.reject(new SubmissionError(response.body.errors));
          action.payload.reject(new SubmissionError(errors));
        } else {
          action.payload.reject(response.statusText);
        }
      },
      errorEffects: (error: TypeError) => [
        put(leaveRequestPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.PUT_REQUEST, worker);
}

function* leaveRequestSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchFetchRequest),
    fork(watchPostFetchRequest),
    fork(watchPutFetchRequest)
  ]);
}

export default leaveRequestSagas;