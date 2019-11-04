import {
  AccountEmployeeAccessHistoryAction as Action,
  accountEmployeeAccessHistoryGetAllError,
  accountEmployeeAccessHistoryGetAllRequest,
  accountEmployeeAccessHistoryGetAllSuccess,
  accountEmployeeAccessHistoryGetByIdError,
  accountEmployeeAccessHistoryGetByIdRequest,
  accountEmployeeAccessHistoryGetByIdSuccess,
  accountEmployeeAccessHistoryGetListError,
  accountEmployeeAccessHistoryGetListRequest,
  accountEmployeeAccessHistoryGetListSuccess,
} from '@account/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeAccessHistoryGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/account/employees/${action.payload.employeeUid}/access/histories/all?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeAccessHistoryGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeAccessHistoryGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeAccessHistoryGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchListRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeAccessHistoryGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/account/employees/${action.payload.employeeUid}/access/histories/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeAccessHistoryGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeAccessHistoryGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeAccessHistoryGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchByIdRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeAccessHistoryGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/account/employees/${action.payload.employeeUid}/access/histories/${action.payload.historyUid}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeAccessHistoryGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeAccessHistoryGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeAccessHistoryGetByIdError(error.message)),

      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* accountEmployeeAccessHistorySagas() {
  yield all([
    fork(watchAllRequest),
    fork(watchListRequest),
    fork(watchByIdRequest)
  ]);
}

export default accountEmployeeAccessHistorySagas;