import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd } from '@layout/store/actions';
import {
  LookupDiemAction as Action,
  lookupDiemDeleteError,
  lookupDiemDeleteRequest,
  lookupDiemDeleteSuccess,
  lookupDiemGetAllDispose,
  lookupDiemGetAllError,
  lookupDiemGetAllRequest,
  lookupDiemGetAllSuccess,
  lookupDiemGetByIdDispose,
  lookupDiemGetByIdError,
  lookupDiemGetByIdRequest,
  lookupDiemGetByIdSuccess,
  lookupDiemGetListError,
  lookupDiemGetListRequest,
  lookupDiemGetListSuccess,
  lookupDiemPostError,
  lookupDiemPostRequest,
  lookupDiemPostSuccess,
  lookupDiemPutError,
  lookupDiemPutRequest,
  lookupDiemPutSuccess,
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof lookupDiemGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/diems?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(lookupDiemGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupDiemGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupDiemGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof lookupDiemGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/diems/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupDiemGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupDiemGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupDiemGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof lookupDiemGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/diems/${action.payload.companyUid}/${action.payload.diemUid}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupDiemGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupDiemGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupDiemGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof lookupDiemPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/lookup/diems/${action.payload.companyUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupDiemPostSuccess(response.body)),
        put(lookupDiemGetAllDispose())
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupDiemPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupDiemPostError(error.message)),
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
  const worker = (action: ReturnType<typeof lookupDiemPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/lookup/diems/${action.payload.companyUid}/${action.payload.diemUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupDiemPutSuccess(response.body)),
        put(lookupDiemGetByIdDispose()),
        put(lookupDiemGetAllDispose())
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupDiemPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupDiemPutError(error.message)),
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
  const worker = (action: ReturnType<typeof lookupDiemDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'delete',
      path: `/v1/lookup/diems`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupDiemGetAllDispose()),
        put(lookupDiemDeleteSuccess(response.body))

      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupDiemDeleteError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupDiemDeleteError(error.message)),
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

function* lookupDiemSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest),
  ]);
}

export default lookupDiemSagas;