import {
  AccountEmployeeContractAction as Action,
  accountEmployeeContractDeleteError,
  accountEmployeeContractDeleteRequest,
  accountEmployeeContractDeleteSuccess,
  accountEmployeeContractGetAllDispose,
  accountEmployeeContractGetAllError,
  accountEmployeeContractGetAllRequest,
  accountEmployeeContractGetAllSuccess,
  accountEmployeeContractGetByIdDispose,
  accountEmployeeContractGetByIdError,
  accountEmployeeContractGetByIdRequest,
  accountEmployeeContractGetByIdSuccess,
  accountEmployeeContractGetListDispose,
  accountEmployeeContractGetListError,
  accountEmployeeContractGetListRequest,
  accountEmployeeContractGetListSuccess,
  accountEmployeeContractPostError,
  accountEmployeeContractPostRequest,
  accountEmployeeContractPostSuccess,
  accountEmployeeContractPutError,
  accountEmployeeContractPutRequest,
  accountEmployeeContractPutSuccess,
} from '@account/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeContractGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/account/employees/${action.payload.employeeUid}/contracts?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeContractGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeContractGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeContractGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchListRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeContractGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/account/employees/${action.payload.employeeUid}/contracts/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeContractGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeContractGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeContractGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchByIdRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeContractGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/account/employees/${action.payload.employeeUid}/contracts/${action.payload.contractUid}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeContractGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeContractGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeContractGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeContractPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/account/employees/${action.payload.employeeUid}/contracts`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(accountEmployeeContractGetByIdDispose()),
        put(accountEmployeeContractGetAllDispose()),
        put(accountEmployeeContractPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(accountEmployeeContractPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(accountEmployeeContractPostError(error.message)),
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
  const worker = (action: ReturnType<typeof accountEmployeeContractPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'PUT',
      path: `/v1/account/employees/${action.payload.employeeUid}/contracts`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(accountEmployeeContractGetByIdDispose()),
        put(accountEmployeeContractGetAllDispose()),
        put(accountEmployeeContractPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(accountEmployeeContractPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(accountEmployeeContractPutError(error.message)),
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

function* watchDeleteRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeContractDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'DELETE',
      path: `/v1/account/employees/${action.payload.employeeUid}/contracts`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(accountEmployeeContractGetAllDispose()),
        put(accountEmployeeContractDeleteSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(accountEmployeeContractDeleteError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(accountEmployeeContractDeleteError(error.message)),
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

  yield takeEvery(Action.DELETE_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(accountEmployeeContractGetAllDispose()),
      put(accountEmployeeContractGetListDispose()),
      put(accountEmployeeContractGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* accountEmployeeContractSagas() {
  yield all([
    fork(watchAllRequest),
    fork(watchListRequest),
    fork(watchByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest),
    fork(watchSwitchAccess)
  ]);
}

export default accountEmployeeContractSagas;