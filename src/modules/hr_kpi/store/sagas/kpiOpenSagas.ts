import {
  KPIOpenAction as Action,
  KPIOpenGetAllDispose,
  KPIOpenGetAllError,
  KPIOpenGetAllRequest,
  KPIOpenGetAllSuccess,
  KPIOpenGetByIdDispose,
  KPIOpenGetByIdError,
  KPIOpenGetByIdRequest,
  KPIOpenGetByIdSuccess,
  KPIOpenPostError,
  KPIOpenPostRequest,
  KPIOpenPostSuccess,
  KPIOpenPutError,
  KPIOpenPutRequest,
  KPIOpenPutSuccess,
} from '@kpi/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof KPIOpenGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      
      method: 'GET',
      path: `/v1/hr/kpi/opens?${params}`,
      successEffects: (response: IApiResponse) => [
        put(KPIOpenGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPIOpenGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPIOpenGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof KPIOpenGetByIdRequest>) => {
    return saiyanSaga.fetch({
      
      method: 'GET',
      path: `/v1/hr/kpi/opens/${action.payload.openUid}`,
      successEffects: (response: IApiResponse) => [
        put(KPIOpenGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPIOpenGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPIOpenGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof KPIOpenPostRequest>) => {
    return saiyanSaga.fetch({
      
      method: 'POST',
      path: `/v1/hr/kpi/opens`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(KPIOpenGetByIdDispose()),
        put(KPIOpenGetAllDispose()),
        put(KPIOpenPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(KPIOpenPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(KPIOpenPostError(error.message)),
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
  const worker = (action: ReturnType<typeof KPIOpenPutRequest>) => {
    return saiyanSaga.fetch({
      
      method: 'PUT',
      path: `/v1/hr/kpi/opens/${action.payload.openUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(KPIOpenGetByIdDispose()),
        put(KPIOpenGetAllDispose()),
        put(KPIOpenPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(KPIOpenPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(KPIOpenPutError(error.message)),
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

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(KPIOpenGetAllDispose()),
      put(KPIOpenGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* kpiOpenSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchSwitchAccess)
  ]);
}

export default kpiOpenSagas;