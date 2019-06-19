import {
  HRMeasurementAction as Action,
  hrMeasurementGetAllDispose,
  hrMeasurementGetAllError,
  hrMeasurementGetAllRequest,
  hrMeasurementGetAllSuccess,
  hrMeasurementGetByIdDispose,
  hrMeasurementGetByIdError,
  hrMeasurementGetByIdRequest,
  hrMeasurementGetByIdSuccess,
  hrMeasurementPostError,
  hrMeasurementPostRequest,
  hrMeasurementPostSuccess,
  hrMeasurementPutError,
  hrMeasurementPutRequest,
  hrMeasurementPutSuccess,
} from '@hr/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof hrMeasurementGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/kpi/measurements?${params}`,
      successEffects: (response: IApiResponse) => [
        put(hrMeasurementGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(hrMeasurementGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(hrMeasurementGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof hrMeasurementGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/kpi/measurements/${action.payload.measurementUid}`,
      successEffects: (response: IApiResponse) => [
        put(hrMeasurementGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(hrMeasurementGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(hrMeasurementGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof hrMeasurementPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/kpi/measurements`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrMeasurementGetByIdDispose()),
        put(hrMeasurementGetAllDispose()),
        put(hrMeasurementPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrMeasurementPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrMeasurementPostError(error.message)),
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
  const worker = (action: ReturnType<typeof hrMeasurementPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/kpi/measurements/${action.payload.measurementUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrMeasurementGetByIdDispose()),
        put(hrMeasurementGetAllDispose()),
        put(hrMeasurementPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrMeasurementPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrMeasurementPutError(error.message)),
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
      put(hrMeasurementGetAllDispose()),
      put(hrMeasurementGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* hrMeasurementSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchSwitchAccess)
  ]);
}

export default hrMeasurementSagas;