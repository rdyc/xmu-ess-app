import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import {
  LeaveRequestAction as Action,
  leaveRequestGetAllError,
  leaveRequestGetAllRequest,
  leaveRequestGetAllSuccess,
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
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof leaveRequestGetAllRequest>) => { 
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/leave/requests/${objectToQuerystring(action.payload.filter)}`, 
      successEffects: (response: IApiResponse) => [
        put(leaveRequestGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
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
        put(listBarLoading(false))
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

function* watchPostFetchRequest() {
  const worker = (action: ReturnType<typeof leaveRequestPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/leave/requests/${action.payload.companyUid}/${action.payload.positionUid}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(leaveRequestPostSuccess(response.body)),
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
        put(leaveRequestPutSuccess(response.body)),
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
    fork(watchPostFetchRequest),
    fork(watchPutFetchRequest)
  ]);
}

export default leaveRequestSagas;