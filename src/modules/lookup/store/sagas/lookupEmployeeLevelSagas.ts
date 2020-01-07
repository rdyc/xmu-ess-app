import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import {
  LookupEmployeeLevelAction as Action,
  lookupEmployeeLevelDeleteError,
  lookupEmployeeLevelDeleteRequest,
  lookupEmployeeLevelDeleteSuccess,
  lookupEmployeeLevelGetAllDispose,
  lookupEmployeeLevelGetAllError,
  lookupEmployeeLevelGetAllRequest,
  lookupEmployeeLevelGetAllSuccess,
  lookupEmployeeLevelGetByIdDispose,
  lookupEmployeeLevelGetByIdError,
  lookupEmployeeLevelGetByIdRequest,
  lookupEmployeeLevelGetByIdSuccess,
  lookupEmployeeLevelGetListDispose,
  lookupEmployeeLevelGetListError,
  lookupEmployeeLevelGetListRequest,
  lookupEmployeeLevelGetListSuccess,
  lookupEmployeeLevelPostError,
  lookupEmployeeLevelPostRequest,
  lookupEmployeeLevelPostSuccess,
  lookupEmployeeLevelPutError,
  lookupEmployeeLevelPutRequest,
  lookupEmployeeLevelPutSuccess,
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof lookupEmployeeLevelGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/lookup/levels?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(lookupEmployeeLevelGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupEmployeeLevelGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupEmployeeLevelGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof lookupEmployeeLevelGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/lookup/levels/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupEmployeeLevelGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupEmployeeLevelGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupEmployeeLevelGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof lookupEmployeeLevelGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/lookup/levels/${action.payload.employeeLevelUid}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupEmployeeLevelGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupEmployeeLevelGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupEmployeeLevelGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof lookupEmployeeLevelPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/lookup/levels`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupEmployeeLevelPostSuccess(response.body)),
        put(lookupEmployeeLevelGetAllDispose())
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupEmployeeLevelPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupEmployeeLevelPostError(error.message)),
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
  const worker = (action: ReturnType<typeof lookupEmployeeLevelPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'PUT',
      path: `/v1/lookup/levels/${action.payload.employeeLevelUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupEmployeeLevelPutSuccess(response.body)),
        put(lookupEmployeeLevelGetByIdDispose()),
        put(lookupEmployeeLevelGetAllDispose())
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupEmployeeLevelPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupEmployeeLevelPutError(error.message)),
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
  const worker = (action: ReturnType<typeof lookupEmployeeLevelDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'DELETE',
      path: `/v1/lookup/levels`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupEmployeeLevelDeleteSuccess(response.body)),
        put(lookupEmployeeLevelGetAllDispose())        
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupEmployeeLevelDeleteError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupEmployeeLevelDeleteError(error.message)),
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

function* watchSwitchAccess() {
  function* worker() {
    yield all([
      put(lookupEmployeeLevelGetAllDispose()),
      put(lookupEmployeeLevelGetListDispose()),
      put(lookupEmployeeLevelGetByIdDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);

}

function* lookupEmployeeLevelSagas() {
  yield all([
    fork(watchSwitchAccess),
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest),
  ]);
}

export default lookupEmployeeLevelSagas;