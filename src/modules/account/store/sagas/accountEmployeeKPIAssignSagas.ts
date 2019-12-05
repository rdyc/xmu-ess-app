import {
  accountEmployeeGetAllKPIAssignError,
  accountEmployeeGetAllKPIAssignRequest,
  accountEmployeeGetAllKPIAssignSuccess,
  AccountEmployeeKPIAssignAction as Action,
  accountEmployeeKPIAssignGetAllError,
  accountEmployeeKPIAssignGetAllRequest,
  accountEmployeeKPIAssignGetAllSuccess,
  accountEmployeeKPIAssignGetByIdError,
  accountEmployeeKPIAssignGetByIdRequest,
  accountEmployeeKPIAssignGetByIdSuccess,
} from '@account/store/actions';

import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllAssignRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeGetAllKPIAssignRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true,
      indices: false
    });

    return saiyanSaga.fetch({
      
      method: 'GET',
      path: `/v1/account/employees/kpis/assign?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeGetAllKPIAssignSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeGetAllKPIAssignError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeGetAllKPIAssignError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_ASSIGN_REQUEST, worker);
}

function* watchAllRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeKPIAssignGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true,
      indices: false
    });

    return saiyanSaga.fetch({
      
      method: 'GET',
      path: `/v1/account/employees/${action.payload.employeeUid}/kpiassigns?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeKPIAssignGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeKPIAssignGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeKPIAssignGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchByIdRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeKPIAssignGetByIdRequest>) => {
    return saiyanSaga.fetch({
      
      method: 'GET',
      path: `/v1/account/employees/${action.payload.employeeUid}/kpiassigns/${action.payload.kpiAssignUid}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeKPIAssignGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeKPIAssignGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeKPIAssignGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* accountEmployeeKPIAssignSagas() {
  yield all([
    fork(watchAllAssignRequest),
    fork(watchAllRequest),
    fork(watchByIdRequest),
  ]);
}

export default accountEmployeeKPIAssignSagas;