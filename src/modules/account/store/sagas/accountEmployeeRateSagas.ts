import {
  AccountEmployeeRateAction as Action,
  accountEmployeeRateCurrentError,
  accountEmployeeRateCurrentRequest,
  accountEmployeeRateCurrentSuccess,
  accountEmployeeRateGetAllDispose,
  accountEmployeeRateGetAllError,
  accountEmployeeRateGetAllRequest,
  accountEmployeeRateGetAllSuccess,
  accountEmployeeRateGetByIdDispose,
  accountEmployeeRateGetByIdError,
  accountEmployeeRateGetByIdRequest,
  accountEmployeeRateGetByIdSuccess,
  accountEmployeeRateGetListError,
  accountEmployeeRateGetListRequest,
  accountEmployeeRateGetListSuccess,
  accountEmployeeRatePutError,
  accountEmployeeRatePutRequest,
  accountEmployeeRatePutSuccess,
} from '@account/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchCurrentRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeRateCurrentRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.employeeUid}/rate`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeRateCurrentSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeRateCurrentError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeRateCurrentError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_CURRENT_REQUEST, worker);
}

function* watchAllRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeRateGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.employeeUid}/rates?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeRateGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeRateGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeRateGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchListRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeRateGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.employeeUid}/rates/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeRateGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeRateGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeRateGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchByIdRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeRateGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.employeeUid}/rates/${action.payload.rateId}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeRateGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeRateGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeRateGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeRatePutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/account/employees/${action.payload.employeeUid}/rates`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(accountEmployeeRateGetByIdDispose()),
        put(accountEmployeeRateGetAllDispose()),
        put(accountEmployeeRatePutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(accountEmployeeRatePutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(accountEmployeeRatePutError(error.message)),
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

function* accountEmployeeRateSagas() {
  yield all([
    fork(watchCurrentRequest),
    fork(watchAllRequest),
    fork(watchListRequest),
    fork(watchByIdRequest),
    fork(watchPutRequest),
  ]);
}

export default accountEmployeeRateSagas;