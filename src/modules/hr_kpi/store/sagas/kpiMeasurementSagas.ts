import {
  KPIMeasurementAction as Action,
  KPIMeasurementGetAllDispose,
  KPIMeasurementGetAllError,
  KPIMeasurementGetAllRequest,
  KPIMeasurementGetAllSuccess,
  KPIMeasurementGetByCategoryDispose,
  KPIMeasurementGetByCategoryError,
  KPIMeasurementGetByCategoryRequest,
  KPIMeasurementGetByCategorySuccess,
  KPIMeasurementGetByIdDispose,
  KPIMeasurementGetByIdError,
  KPIMeasurementGetByIdRequest,
  KPIMeasurementGetByIdSuccess,
  KPIMeasurementGetListDispose,
  KPIMeasurementGetListError,
  KPIMeasurementGetListRequest,
  KPIMeasurementGetListSuccess,
  KPIMeasurementPostError,
  KPIMeasurementPostRequest,
  KPIMeasurementPostSuccess,
  KPIMeasurementPutError,
  KPIMeasurementPutRequest,
  KPIMeasurementPutSuccess,
} from '@kpi/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof KPIMeasurementGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/kpi/measurements?${params}`,
      successEffects: (response: IApiResponse) => [
        put(KPIMeasurementGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPIMeasurementGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPIMeasurementGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetByCategoryRequest() {
  const worker = (action: ReturnType<typeof KPIMeasurementGetByCategoryRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/kpi/measurements/${action.payload.categoryUid}?${params}`,
      successEffects: (response: IApiResponse) => [
        put(KPIMeasurementGetByCategorySuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPIMeasurementGetByCategoryError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPIMeasurementGetByCategoryError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_BYCATEGORY_REQUEST, worker);
}

function* watchGetListRequest() {
  const worker = (action: ReturnType<typeof KPIMeasurementGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/kpi/measurements/${action.payload.categoryUid}/list?${params}`,
      successEffects: (response: IApiResponse) => [
        put(KPIMeasurementGetListSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPIMeasurementGetListError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPIMeasurementGetListError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof KPIMeasurementGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/kpi/measurements/${action.payload.categoryUid}/${action.payload.measurementUid}`,
      successEffects: (response: IApiResponse) => [
        put(KPIMeasurementGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPIMeasurementGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPIMeasurementGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof KPIMeasurementPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/kpi/measurements/${action.payload.categoryUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(KPIMeasurementGetByIdDispose()),
        put(KPIMeasurementGetAllDispose()),
        put(KPIMeasurementPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(KPIMeasurementPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(KPIMeasurementPostError(error.message)),
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
  const worker = (action: ReturnType<typeof KPIMeasurementPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/kpi/measurements/${action.payload.categoryUid}/${action.payload.measurementUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(KPIMeasurementGetByIdDispose()),
        put(KPIMeasurementGetAllDispose()),
        put(KPIMeasurementPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(KPIMeasurementPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(KPIMeasurementPutError(error.message)),
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
      put(KPIMeasurementGetAllDispose()),
      put(KPIMeasurementGetByCategoryDispose()),
      put(KPIMeasurementGetListDispose()),
      put(KPIMeasurementGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* kpiMeasurementSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByCategoryRequest),
    fork(watchGetListRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchSwitchAccess)
  ]);
}

export default kpiMeasurementSagas;