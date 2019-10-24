import {
  HrCornerPageAction as Action,
  hrCornerPageDeleteError,
  hrCornerPageDeleteRequest,
  hrCornerPageDeleteSuccess,
  hrCornerPageGetAllDispose,
  hrCornerPageGetAllError,
  hrCornerPageGetAllRequest,
  hrCornerPageGetAllSuccess,
  hrCornerPageGetByIdDispose,
  hrCornerPageGetByIdError,
  hrCornerPageGetByIdRequest,
  hrCornerPageGetByIdSuccess,
  hrCornerPagePostError,
  hrCornerPagePostRequest,
  hrCornerPagePostSuccess,
  hrCornerPagePutError,
  hrCornerPagePutRequest,
  hrCornerPagePutSuccess,
} from '@hr/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof hrCornerPageGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/hr/corner/pages?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(hrCornerPageGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCornerPageGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCornerPageGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof hrCornerPageGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/hr/corner/pages/${action.payload.pageUid}`,
      successEffects: (response: IApiResponse) => ([
        put(hrCornerPageGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCornerPageGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCornerPageGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof hrCornerPagePostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/hr/corner/pages`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCornerPageGetByIdDispose()),
        put(hrCornerPageGetAllDispose()),
        put(hrCornerPagePostSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCornerPagePostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCornerPagePostError(error.message)),
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
  const worker = (action: ReturnType<typeof hrCornerPagePutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/hr/corner/pages/${action.payload.pageUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCornerPageGetByIdDispose()),
        put(hrCornerPageGetAllDispose()),
        put(hrCornerPagePutSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCornerPagePutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCornerPagePutError(error.message)),
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
  const worker = (action: ReturnType<typeof hrCornerPageDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'delete',
      path: `/v1/hr/corner/pages`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCornerPageGetByIdDispose()),
        put(hrCornerPageGetAllDispose()),
        put(hrCornerPageDeleteSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCornerPageDeleteError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCornerPageDeleteError(error.message)),
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
      put(hrCornerPageGetAllDispose()),
      put(hrCornerPageGetByIdDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);

}

function* hrCornerPageSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest),
    fork(watchSwitchAccess)
  ]);
}

export default hrCornerPageSagas;