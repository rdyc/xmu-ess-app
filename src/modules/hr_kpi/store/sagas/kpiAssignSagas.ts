import { newHostAddress } from '@constants/newHostAddress';
import {
  KPIAssignAction as Action,
  KPIAssignGetAllDispose,
  KPIAssignGetAllError,
  KPIAssignGetAllRequest,
  KPIAssignGetAllSuccess,
  KPIAssignGetByIdDispose,
  KPIAssignGetByIdError,
  KPIAssignGetByIdRequest,
  KPIAssignGetByIdSuccess,
  KPIAssignGetByYearDispose,
  KPIAssignGetByYearError,
  KPIAssignGetByYearRequest,
  KPIAssignGetByYearSuccess,
  KPIAssignPostBulkError,
  KPIAssignPostBulkRequest,
  KPIAssignPostBulkSuccess,
  KPIAssignPutError,
  KPIAssignPutRequest,
  KPIAssignPutSuccess,
} from '@kpi/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof KPIAssignGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host: newHostAddress,
      method: 'get',
      path: `/v1/hr/kpi/assign/${action.payload.employeeUid}?${params}`,
      successEffects: (response: IApiResponse) => [
        put(KPIAssignGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPIAssignGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPIAssignGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetByYearRequest() {
  const worker = (action: ReturnType<typeof KPIAssignGetByYearRequest>) => {
    return saiyanSaga.fetch({
      host: newHostAddress,
      method: 'get',
      path: `/v1/hr/kpi/assign/${action.payload.employeeUid}/${action.payload.year}/year`,
      successEffects: (response: IApiResponse) => [
        put(KPIAssignGetByYearSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPIAssignGetByYearError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPIAssignGetByYearError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_YEAR_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof KPIAssignGetByIdRequest>) => {
    return saiyanSaga.fetch({
      host: newHostAddress,
      method: 'get',
      path: `/v1/hr/kpi/assign/${action.payload.employeeUid}/${action.payload.kpiAssignUid}`,
      successEffects: (response: IApiResponse) => [
        put(KPIAssignGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPIAssignGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPIAssignGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostBulkRequest() {
  const worker = (action: ReturnType<typeof KPIAssignPostBulkRequest>) => {
    return saiyanSaga.fetch({
      host: newHostAddress,
      method: 'post',
      path: `/v1/hr/kpi/assign`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(KPIAssignGetByIdDispose()),
        put(KPIAssignGetByYearDispose()),
        put(KPIAssignGetAllDispose()),
        put(KPIAssignPostBulkSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(KPIAssignPostBulkError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(KPIAssignPostBulkError(error.message)),
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
  const worker = (action: ReturnType<typeof KPIAssignPutRequest>) => {
    return saiyanSaga.fetch({
      host: newHostAddress,
      method: 'put',
      path: `/v1/hr/kpi/assign/${action.payload.employeeUid}/${action.payload.kpiAssignUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(KPIAssignGetByIdDispose()),
        put(KPIAssignGetAllDispose()),
        put(KPIAssignPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(KPIAssignPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(KPIAssignPutError(error.message)),
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
      put(KPIAssignGetAllDispose()),
      put(KPIAssignGetByIdDispose()),
      put(KPIAssignGetByYearDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* kpiAssignSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchGetByYearRequest),
    fork(watchPostBulkRequest),
    fork(watchPutRequest),
    fork(watchSwitchAccess),
  ]);
}

export default kpiAssignSagas;