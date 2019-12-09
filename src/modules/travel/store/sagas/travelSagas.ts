import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import {
  TravelAction as Action,
  travelGetAllDispose,
  travelGetAllError,
  travelGetAllowedError,
  travelGetAllowedRequest,
  travelGetAllowedSuccess,
  travelGetAllRequest,
  travelGetAllSuccess,
  travelGetByIdDispose,
  travelGetByIdError,
  travelGetByIdRequest,
  travelGetByIdSuccess,
  travelPostError,
  travelPostRequest,
  travelPostSuccess,
  travelPutError,
  travelPutRequest,
  travelPutSuccess,
} from '@travel/store/actions';
// import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
// import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof travelGetAllRequest>) => { 
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/travel/requests?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(travelGetAllSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(travelGetAllError(response))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(travelGetAllError(error.message)),
      ]),
      finallyEffects: [
        // nothing
      ]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchByIdFetchRequest() {
  const worker = (action: ReturnType<typeof travelGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/travel/requests/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.travelUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(travelGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(travelGetByIdError(response))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(travelGetByIdError(error.message))
      ])
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostFetchRequest() {
  const worker = (action: ReturnType<typeof travelPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/travel/requests/${action.payload.companyUid}/${action.payload.positionUid}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(travelGetByIdDispose()),
        put(travelGetAllDispose()),
        put(travelPostSuccess(response.body))
      ], 
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(travelPostError(response.statusText)),
      ], 
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(travelPostError(error.message)),
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
  const worker = (action: ReturnType<typeof travelPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'PUT',
      path: `/v1/travel/requests/${action.payload.companyUid}/${
        action.payload.positionUid
      }/${action.payload.travelUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(travelGetAllDispose()),
        put(travelGetByIdDispose()),
        put(travelPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(travelPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(travelPutError(error.message)),
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

  yield takeEvery(Action.PUT_REQUEST, worker);
}

function* watchAllowedFetchRequest() {
  const worker = (action: ReturnType<typeof travelGetAllowedRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/travel/requests/${action.payload.companyUid}/${action.payload.positionUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(travelGetAllowedSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(travelGetAllowedError(response))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(travelGetAllowedError(error.message))
      ])
    });
  };

  yield takeEvery(Action.GET_ALLOWED_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(travelGetAllDispose()),
      put(travelGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* travelSagas() {
  yield all([
    fork(watchAllowedFetchRequest),
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostFetchRequest),
    fork(watchPutFetchRequest),
    fork(watchSwitchAccess)
  ]);
}

export default travelSagas;