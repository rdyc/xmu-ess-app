import {
  AccountEmployeeAccessAction as Action,
  accountEmployeeAccessGetAllError,
  accountEmployeeAccessGetAllRequest,
  accountEmployeeAccessGetAllSuccess,
  accountEmployeeAccessGetByIdError,
  accountEmployeeAccessGetByIdRequest,
  accountEmployeeAccessGetByIdSuccess,
  accountEmployeeAccessGetListError,
  accountEmployeeAccessGetListRequest,
  accountEmployeeAccessGetListSuccess,
} from '@account/store/actions';
import { layoutAlertAdd } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchAllRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeAccessGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.employeeUid}/access${objectToQuerystring(action.payload.filter)}`, 
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeAccessGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeAccessGetAllError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeAccessGetAllError(error.message)),
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
  const worker = (action: ReturnType<typeof accountEmployeeAccessGetListRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.employeeUid}/list${objectToQuerystring(action.payload.filter)}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeAccessGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeAccessGetListError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeAccessGetListError(error.message)),
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
  const worker = (action: ReturnType<typeof accountEmployeeAccessGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.employeeUid}/access/${action.payload.accessUid}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeAccessGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeAccessGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeAccessGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message,
        }))
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* accountEmployeeAccessSagas() {
  yield all([
    fork(watchAllRequest),
    fork(watchListRequest),
    fork(watchByIdRequest),
  ]);
}

export default accountEmployeeAccessSagas;