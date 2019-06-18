import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd } from '@layout/store/actions';
import {
  LookupPositionAction as Action,
  lookupPositionDeleteError,
  lookupPositionDeleteRequest,
  lookupPositionDeleteSuccess,
  lookupPositionGetAllDispose,
  lookupPositionGetAllError,
  lookupPositionGetAllRequest,
  lookupPositionGetAllSuccess,
  lookupPositionGetByIdDispose,
  lookupPositionGetByIdError,
  lookupPositionGetByIdRequest,
  lookupPositionGetByIdSuccess,
  lookupPositionGetListError,
  lookupPositionGetListRequest,
  lookupPositionGetListSuccess,
  lookupPositionPostError,
  lookupPositionPostRequest,
  lookupPositionPostSuccess,
  lookupPositionPutError,
  lookupPositionPutRequest,
  lookupPositionPutSuccess,
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof lookupPositionGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/positions?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(lookupPositionGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupPositionGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupPositionGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof lookupPositionGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/positions/list?${[params]}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupPositionGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupPositionGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupPositionGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof lookupPositionGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/positions/${action.payload.companyUid}/${action.payload.positionUid}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupPositionGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupPositionGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupPositionGetByIdError(error.message)),
      ]),
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchFetchPostRequest() {
  const worker = (action: ReturnType<typeof lookupPositionPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/lookup/positions/${action.payload.companyUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => ([
        put(lookupPositionGetAllDispose()),
        put(lookupPositionGetByIdDispose()),
        put(lookupPositionPostSuccess(response.body))
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(lookupPositionPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupPositionPostError(error.message)),
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

function* watchFetchPutRequest() {
  const worker = (action: ReturnType<typeof lookupPositionPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/lookup/positions/${action.payload.companyUid}/${action.payload.positionUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => ([
        put(lookupPositionGetByIdDispose()),
        put(lookupPositionGetAllDispose()),
        put(lookupPositionPutSuccess(response.body)),
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(lookupPositionPutError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupPositionPutError(error.message)),
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

function* watchFetchDeleteRequest() {
  const worker = (action: ReturnType<typeof lookupPositionDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'delete',
      path: `/v1/lookup/positions/`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => ([
        put(lookupPositionGetAllDispose()),
        put(lookupPositionGetByIdDispose()),
        put(lookupPositionDeleteSuccess(response.body)),
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(lookupPositionDeleteError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupPositionDeleteError(error.message)),
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

  yield takeEvery(Action.DELETE_REQUEST, worker);
}

function* lookupPositionSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
    fork(watchFetchPostRequest),
    fork(watchFetchPutRequest),
    fork(watchFetchDeleteRequest),
  ]);
}

export default lookupPositionSagas;