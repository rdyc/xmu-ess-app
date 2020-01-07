import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd } from '@layout/store/actions';
import {
  LookupSystemLimitAction as Action,
  lookupSystemLimitDeleteError,
  lookupSystemLimitDeleteRequest,
  lookupSystemLimitDeleteSuccess,
  lookupSystemLimitGetAllDispose,
  lookupSystemLimitGetAllError,
  lookupSystemLimitGetAllRequest,
  lookupSystemLimitGetAllSuccess,
  lookupSystemLimitGetAmountError,
  lookupSystemLimitGetAmountRequest,
  lookupSystemLimitGetAmountSuccess,
  lookupSystemLimitGetByIdDispose,
  lookupSystemLimitGetByIdError,
  lookupSystemLimitGetByIdRequest,
  lookupSystemLimitGetByIdSuccess,
  lookupSystemLimitGetListError,
  lookupSystemLimitGetListRequest,
  lookupSystemLimitGetListSuccess,
  lookupSystemLimitPostError,
  lookupSystemLimitPostRequest,
  lookupSystemLimitPostSuccess,
  lookupSystemLimitPutError,
  lookupSystemLimitPutRequest,
  lookupSystemLimitPutSuccess,
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof lookupSystemLimitGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/lookup/systemlimits?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(lookupSystemLimitGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupSystemLimitGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupSystemLimitGetAllError(error.message)),
      ]),
      finallyEffects: [
        // nothing
      ]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetAmountRequest() {
  const worker = (action: ReturnType<typeof lookupSystemLimitGetAmountRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/lookup/systemlimits/limit/${action.payload.companyUid}/${action.payload.categoryType}`, 
      successEffects: (response: IApiResponse) => ([
        put(lookupSystemLimitGetAmountSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupSystemLimitGetAmountError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupSystemLimitGetAmountError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_AMOUNT_REQUEST, worker);
}

function* watchGetListRequest() {
  const worker = (action: ReturnType<typeof lookupSystemLimitGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/lookup/systemlimits/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupSystemLimitGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupSystemLimitGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupSystemLimitGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof lookupSystemLimitGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/lookup/systemlimits/${action.payload.companyUid}/${action.payload.limitUid}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupSystemLimitGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupSystemLimitGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupSystemLimitGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof lookupSystemLimitPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/lookup/systemlimits/${action.payload.companyUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupSystemLimitGetByIdDispose()),
        put(lookupSystemLimitGetAllDispose()),
        put(lookupSystemLimitPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupSystemLimitPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupSystemLimitPostError(error.message)),
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
  const worker = (action: ReturnType<typeof lookupSystemLimitPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'PUT',
      path: `/v1/lookup/systemlimits/${action.payload.companyUid}/${action.payload.limitUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupSystemLimitGetByIdDispose()),
        put(lookupSystemLimitGetAllDispose()),
        put(lookupSystemLimitPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupSystemLimitPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupSystemLimitPutError(error.message)),
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
  const worker = (action: ReturnType<typeof lookupSystemLimitDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'DELETE',
      path: `/v1/lookup/systemlimits`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupSystemLimitGetAllDispose()),
        put(lookupSystemLimitDeleteSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupSystemLimitDeleteError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupSystemLimitDeleteError(error.message)),
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

function* lookupSystemLimitSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetAmountRequest),
    fork(watchGetListRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest)
  ]);
}

export default lookupSystemLimitSagas;