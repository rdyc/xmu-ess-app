import { newHostAddress } from '@constants/newHostAddress';
import {
  KPICategoryAction as Action,
  KPICategoryGetAllDispose,
  KPICategoryGetAllError,
  KPICategoryGetAllRequest,
  KPICategoryGetAllSuccess,
  KPICategoryGetByIdDispose,
  KPICategoryGetByIdError,
  KPICategoryGetByIdRequest,
  KPICategoryGetByIdSuccess,
  KPICategoryGetListDispose,
  KPICategoryGetListError,
  KPICategoryGetListRequest,
  KPICategoryGetListSuccess,
  KPICategoryMeasurementPostError,
  KPICategoryMeasurementPostRequest,
  KPICategoryMeasurementPostSuccess,
  KPICategoryPostError,
  KPICategoryPostRequest,
  KPICategoryPostSuccess,
  KPICategoryPutError,
  KPICategoryPutRequest,
  KPICategoryPutSuccess,
} from '@kpi/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof KPICategoryGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host: newHostAddress,
      method: 'get',
      path: `/v1/kpi/categories?${params}`,
      successEffects: (response: IApiResponse) => [
        put(KPICategoryGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPICategoryGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPICategoryGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetListRequest() {
  const worker = (action: ReturnType<typeof KPICategoryGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host: newHostAddress,
      method: 'get',
      path: `/v1/kpi/categories/list?${params}`,
      successEffects: (response: IApiResponse) => [
        put(KPICategoryGetListSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPICategoryGetListError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPICategoryGetListError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof KPICategoryGetByIdRequest>) => {
    return saiyanSaga.fetch({
      host: newHostAddress,
      method: 'get',
      path: `/v1/kpi/categories/${action.payload.categoryUid}`,
      successEffects: (response: IApiResponse) => [
        put(KPICategoryGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPICategoryGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPICategoryGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof KPICategoryPostRequest>) => {
    return saiyanSaga.fetch({
      host: newHostAddress,
      method: 'post',
      path: `/v1/kpi/categories`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(KPICategoryGetByIdDispose()),
        put(KPICategoryGetAllDispose()),
        put(KPICategoryPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(KPICategoryPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(KPICategoryPostError(error.message)),
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

function* watchMeasurementPostRequest() {
  const worker = (action: ReturnType<typeof KPICategoryMeasurementPostRequest>) => {
    return saiyanSaga.fetch({
      host: newHostAddress,
      method: 'post',
      path: `/v1/kpi/categories/measurement`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(KPICategoryGetByIdDispose()),
        put(KPICategoryGetAllDispose()),
        put(KPICategoryMeasurementPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(KPICategoryMeasurementPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(KPICategoryMeasurementPostError(error.message)),
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

  yield takeEvery(Action.MEASUREMENT_POST_REQUEST, worker);
}

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof KPICategoryPutRequest>) => {
    return saiyanSaga.fetch({
      host: newHostAddress,
      method: 'put',
      path: `/v1/kpi/categories/${action.payload.categoryUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(KPICategoryGetByIdDispose()),
        put(KPICategoryGetAllDispose()),
        put(KPICategoryPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(KPICategoryPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(KPICategoryPutError(error.message)),
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
      put(KPICategoryGetAllDispose()),
      put(KPICategoryGetListDispose()),
      put(KPICategoryGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* kpiCategorySagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetListRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchMeasurementPostRequest),
    fork(watchPutRequest),
    fork(watchSwitchAccess)
  ]);
}

export default kpiCategorySagas;