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
  KPIEmployeePostBulkError,
  KPIEmployeePostBulkRequest,
  KPIEmployeePostBulkSuccess,
  KPIEmployeePutAchievedError,
  KPIEmployeePutAchievedRequest,
  KPIEmployeePutAchievedSuccess,
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
      path: `/v1/kpi/employees/${action.payload.employeeUid}?${params}`,
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
      path: `/v1/kpi/employees/${action.payload.employeeUid}/${action.payload.kpiUid}`,
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

function* watchPostBulkRequest() {
  const worker = (action: ReturnType<typeof KPIEmployeePostBulkRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/kpi/employees/${action.payload.companyUid}/${action.payload.positionUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(KPIEmployeeGetByIdDispose()),
        put(KPIEmployeeGetAllDispose()),
        put(KPIEmployeePostBulkSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(KPIEmployeePostBulkError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(KPIEmployeePostBulkError(error.message)),
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

  yield takeEvery(Action.POST_BULK_REQUEST, worker);
}

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof KPIEmployeePutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/kpi/employees/${action.payload.employeeUid}/${action.payload.kpiUid}`,
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

function* watchPutAchievedRequest() {
  const worker = (action: ReturnType<typeof KPIEmployeePutAchievedRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/kpi/employees/${action.payload.employeeUid}/${action.payload.kpiUid}/achieved`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(KPIEmployeeGetByIdDispose()),
        put(KPIEmployeeGetAllDispose()),
        put(KPIEmployeePutAchievedSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(KPIEmployeePutAchievedError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(KPIEmployeePutAchievedError(error.message)),
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

  yield takeEvery(Action.PUT_ACHIEVED_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(KPIEmployeeGetAllDispose()),
      put(KPIEmployeeGetByIdDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* kpiEmployeeSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchPostBulkRequest),
    fork(watchPutRequest),
    fork(watchPutAchievedRequest),
    fork(watchSwitchAccess),
  ]);
}

export default kpiEmployeeSagas;