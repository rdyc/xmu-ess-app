
import {
  KPIEmployeeAction as Action,
  KPIEmployeeGetAllDispose,
  KPIEmployeeGetAllError,
  KPIEmployeeGetAllRequest,
  KPIEmployeeGetAllSuccess,
  KPIEmployeeGetByIdDispose,
  KPIEmployeeGetByIdError,
  KPIEmployeeGetByIdRequest,
  KPIEmployeeGetByIdSuccess,
  KPIEmployeeGetLatestDispose,
  KPIEmployeeGetLatestError,
  KPIEmployeeGetLatestRequest,
  KPIEmployeeGetLatestSuccess,
  KPIEmployeePostError,
  KPIEmployeePostRequest,
  KPIEmployeePostSuccess,
  KPIEmployeePutError,
  KPIEmployeePutRequest,
  KPIEmployeePutSuccess,
} from '@kpi/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof KPIEmployeeGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      
      method: 'get',
      path: `/v1/hr/kpi/employees/${action.payload.companyUid}/${action.payload.positionUid}?${params}`,
      successEffects: (response: IApiResponse) => [
        put(KPIEmployeeGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPIEmployeeGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPIEmployeeGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof KPIEmployeeGetByIdRequest>) => {
    return saiyanSaga.fetch({
      
      method: 'get',
      path: `/v1/hr/kpi/employees/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.kpiUid}`,
      successEffects: (response: IApiResponse) => [
        put(KPIEmployeeGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPIEmployeeGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPIEmployeeGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchGetLatestRequest() {
  const worker = (action: ReturnType<typeof KPIEmployeeGetLatestRequest>) => {
    return saiyanSaga.fetch({
      
      method: 'get',
      path: `/v1/hr/kpi/employees/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.kpiAssignUid}/latest`,
      successEffects: (response: IApiResponse) => [
        put(KPIEmployeeGetLatestSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPIEmployeeGetLatestError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPIEmployeeGetLatestError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_LATEST_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof KPIEmployeePostRequest>) => {
    return saiyanSaga.fetch({
      
      method: 'post',
      path: `/v1/hr/kpi/employees/${action.payload.companyUid}/${action.payload.positionUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(KPIEmployeeGetByIdDispose()),
        put(KPIEmployeeGetAllDispose()),
        put(KPIEmployeePostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(KPIEmployeePostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(KPIEmployeePostError(error.message)),
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
  const worker = (action: ReturnType<typeof KPIEmployeePutRequest>) => {
    return saiyanSaga.fetch({
      
      method: 'put',
      path: `/v1/hr/kpi/employees/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.kpiUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(KPIEmployeeGetByIdDispose()),
        put(KPIEmployeeGetAllDispose()),
        put(KPIEmployeePutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(KPIEmployeePutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(KPIEmployeePutError(error.message)),
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
      put(KPIEmployeeGetAllDispose()),
      put(KPIEmployeeGetByIdDispose()),
      put(KPIEmployeeGetLatestDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* kpiEmployeeSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchGetLatestRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchSwitchAccess),
  ]);
}

export default kpiEmployeeSagas;