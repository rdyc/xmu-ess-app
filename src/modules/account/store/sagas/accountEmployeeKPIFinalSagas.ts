import {
  accountEmployeeGetAllKPIFinalError,
  accountEmployeeGetAllKPIFinalRequest,
  accountEmployeeGetAllKPIFinalSuccess,
  AccountEmployeeKPIFinalAction as Action,
  accountEmployeeKPIFinalGetAllError,
  accountEmployeeKPIFinalGetAllRequest,
  accountEmployeeKPIFinalGetAllSuccess,
  accountEmployeeKPIFinalGetByIdError,
  accountEmployeeKPIFinalGetByIdRequest,
  accountEmployeeKPIFinalGetByIdSuccess,
} from '@account/store/actions';

import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllFinalRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeGetAllKPIFinalRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true,
      indices: false
    });

    return saiyanSaga.fetch({
      
      method: 'GET',
      path: `/v1/account/employees/kpis/final?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeGetAllKPIFinalSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeGetAllKPIFinalError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeGetAllKPIFinalError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_FINAL_REQUEST, worker);
}

function* watchAllRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeKPIFinalGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true,
      indices: false
    });

    return saiyanSaga.fetch({
      
      method: 'GET',
      path: `/v1/account/employees/${action.payload.employeeUid}/kpifinals?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeKPIFinalGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeKPIFinalGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeKPIFinalGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchByIdRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeKPIFinalGetByIdRequest>) => {
    return saiyanSaga.fetch({
      
      method: 'GET',
      path: `/v1/account/employees/${action.payload.employeeUid}/kpifinals/${action.payload.kpiUid}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeKPIFinalGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeKPIFinalGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeKPIFinalGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* accountEmployeeKPIFinalSagas() {
  yield all([
    fork(watchAllFinalRequest),
    fork(watchAllRequest),
    fork(watchByIdRequest),
  ]);
}

export default accountEmployeeKPIFinalSagas;