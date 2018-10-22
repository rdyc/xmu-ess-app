import {
  AccountEmployeeAction as Action,
  accountEmployeeGetAllError,
  accountEmployeeGetAllRequest,
  accountEmployeeGetAllSuccess,
  accountEmployeeGetByIdError,
  accountEmployeeGetByIdRequest,
  accountEmployeeGetByIdSuccess,
  accountEmployeeGetListError,
  accountEmployeeGetListRequest,
  accountEmployeeGetListSuccess,
} from '@account/store/actions';
import { layoutAlertAdd } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchAllRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees${objectToQuerystring(action.payload.filter)}`, 
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeGetAllError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchListRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeGetListRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/list${objectToQuerystring(action.payload.filter)}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeGetListError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeGetListError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchByIdRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.employeeUid}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message,
        }))
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* accountEmployeeSagas() {
  yield all([
    fork(watchAllRequest),
    fork(watchListRequest),
    fork(watchByIdRequest),
  ]);
}

export default accountEmployeeSagas;