import {
  EmployeeAction,
  employeeGetAllError,
  employeeGetAllRequest,
  employeeGetAllSuccess,
  employeeGetByIdError,
  employeeGetByIdRequest,
  employeeGetByIdSuccess,
  employeeGetListError,
  employeeGetListRequest,
  employeeGetListSuccess,
} from '@account/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { objectToQuerystring, IApiResponse } from 'utils';
import { layoutAlertAdd } from '@layout/store/actions';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof employeeGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: '/v1/account/employees' + objectToQuerystring(action.payload.filter), 
      success: (response: IApiResponse) => ([
        put(employeeGetAllSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(employeeGetAllError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(employeeGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([])
    });
  };
  
  yield takeEvery(EmployeeAction.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof employeeGetListRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: '/v1/account/employees/list' + objectToQuerystring(action.payload.filter),
      success: (response: IApiResponse) => ([
        put(employeeGetListSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(employeeGetListError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(employeeGetListError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([])
    });
  };

  yield takeEvery(EmployeeAction.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof employeeGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.employeeUid}`,
      success: (response: IApiResponse) => ([
        put(employeeGetByIdSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(employeeGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(employeeGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message,
        }))
      ]),
      finally: () => ([])
    });
  };
  
  yield takeEvery(EmployeeAction.GET_BY_ID_REQUEST, worker);
}

function* employeeSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default employeeSagas;