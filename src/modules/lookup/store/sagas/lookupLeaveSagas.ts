import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd } from '@layout/store/actions';
import {
  LookupLeaveAction as Action,
  lookupLeaveDeleteError,
  lookupLeaveDeleteRequest,
  lookupLeaveDeleteSuccess,
  lookupLeaveGetAllDispose,
  lookupLeaveGetAllError,
  lookupLeaveGetAllRequest,
  lookupLeaveGetAllSuccess,
  lookupLeaveGetByIdDispose,
  lookupLeaveGetByIdError,
  lookupLeaveGetByIdRequest,
  lookupLeaveGetByIdSuccess,
  lookupLeaveGetListError,
  lookupLeaveGetListRequest,
  lookupLeaveGetListSuccess,
  lookupLeavePostError,
  lookupLeavePostRequest,
  lookupLeavePostSuccess,
  lookupLeavePutError,
  lookupLeavePutRequest,
  lookupLeavePutSuccess,
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

// import { SubmissionError } from 'redux-form';
function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof lookupLeaveGetAllRequest>) => { 
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/lookup/leaves?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(lookupLeaveGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupLeaveGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupLeaveGetAllError(error.message)),
      ]),
      finallyEffects: [
        // put(listBarLoading(false))
      ]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetListRequest() {
  const worker = (action: ReturnType<typeof lookupLeaveGetListRequest>) => { 
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/lookup/leaves/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupLeaveGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupLeaveGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupLeaveGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof lookupLeaveGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/lookup/leaves/${action.payload.companyUid}/${action.payload.leaveUid}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupLeaveGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupLeaveGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupLeaveGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof lookupLeavePostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/lookup/leaves/${action.payload.companyUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupLeaveGetByIdDispose()),
        put(lookupLeaveGetAllDispose()),
        put(lookupLeavePostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupLeavePostError(response.statusText)),
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupLeavePostError(error.message)),
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

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof lookupLeavePutRequest>) => {
    return saiyanSaga.fetch({
      method: 'PUT',
      path: `/v1/lookup/leaves/${action.payload.companyUid}/${action.payload.leaveUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupLeaveGetByIdDispose()),
        put(lookupLeaveGetAllDispose()),
        put(lookupLeavePutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupLeavePutError(response.statusText)),
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupLeavePutError(error.message)),
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

function* watchDeleteRequest() {
  const worker = (action: ReturnType<typeof lookupLeaveDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'DELETE',
      path: `/v1/lookup/leaves`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupLeaveGetAllDispose()),
        put(lookupLeaveDeleteSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupLeaveDeleteError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupLeaveDeleteError(error.message)),
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

  yield takeEvery(Action.DELETE_REQUEST, worker);
}

function* lookupLeaveSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetListRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest)
  ]);
}

export default lookupLeaveSagas;