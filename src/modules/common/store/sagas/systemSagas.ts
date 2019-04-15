import {
  SystemAction as Action,
  systemGetAllDispose,
  systemGetAllError,
  systemGetAllRequest,
  systemGetAllSuccess,
  systemGetByIdError,
  systemGetByIdRequest,
  systemGetByIdSuccess,
  systemGetListError,
  systemGetListRequest,
  systemGetListSuccess,
  systemGetTypeError,
  systemGetTypeSuccess,
  systemPostError,
  systemPostRequest,
  systemPostSuccess,
  systemPutError,
  systemPutRequest,
  systemPutSuccess,
} from '@common/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchTypeRequest() {
  const worker = () => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types`,
      successEffects: (response: IApiResponse) => ([
        put(systemGetTypeSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(systemGetTypeError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(systemGetTypeError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_TYPE_REQUEST, worker);
}

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof systemGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(systemGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(systemGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(systemGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof systemGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(systemGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(systemGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(systemGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof systemGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}/${action.payload.id}`,
      successEffects: (response: IApiResponse) => ([
        put(systemGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(systemGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(systemGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof systemPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/common/types/${action.payload.category}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(systemPostSuccess(response.body)),
        put(systemGetAllDispose()),
      ], 
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(systemPostError(response.statusText)),
      ], 
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(systemPostError(error.message)),
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

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof systemPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/common/types/${action.payload.category}/${action.payload.id}`,
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(systemPutSuccess(response.body)),
        put(systemGetAllDispose()),
      ], 
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(systemPutError(response.statusText))
      ], 
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(systemPutError(error.message)),
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

function* commonSystemSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
    fork(watchFetchTypeRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
  ]);
}

export default commonSystemSagas;