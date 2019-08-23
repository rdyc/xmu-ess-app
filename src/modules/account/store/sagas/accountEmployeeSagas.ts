import {
  AccountEmployeeAction as Action,
  accountEmployeeDeleteError,
  accountEmployeeDeleteRequest,
  accountEmployeeDeleteSuccess,
  accountEmployeeGetAllDispose,
  accountEmployeeGetAllError,
  accountEmployeeGetAllRequest,
  accountEmployeeGetAllSuccess,
  accountEmployeeGetByIdDispose,
  accountEmployeeGetByIdError,
  accountEmployeeGetByIdRequest,
  accountEmployeeGetByIdSuccess,
  accountEmployeeGetListError,
  accountEmployeeGetListRequest,
  accountEmployeeGetListSuccess,
  accountEmployeePostError,
  accountEmployeePostRequest,
  accountEmployeePostSuccess,
  accountEmployeePutError,
  accountEmployeePutRequest,
  accountEmployeePutSuccess,
} from '@account/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true,
      indices: false
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v2/account/employees?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchListRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true,
      indices: false
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeGetListError(error.message)),
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
        put(accountEmployeeGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof accountEmployeePostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/account/employees/${action.payload.companyUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(accountEmployeeGetByIdDispose()),
        put(accountEmployeeGetAllDispose()),
        put(accountEmployeePostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(accountEmployeePostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(accountEmployeePostError(error.message)),
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof accountEmployeePutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/account/employees/${action.payload.companyUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(accountEmployeeGetByIdDispose()),
        put(accountEmployeeGetAllDispose()),
        put(accountEmployeePutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(accountEmployeePutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(accountEmployeePutError(error.message)),
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
  const worker = (action: ReturnType<typeof accountEmployeeDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'delete',
      path: `/v1/account/employees/${action.payload.companyUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(accountEmployeeGetAllDispose()),
        put(accountEmployeeDeleteSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(accountEmployeeDeleteError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(accountEmployeeDeleteError(error.message)),
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

function* accountEmployeeSagas() {
  yield all([
    fork(watchAllRequest),
    fork(watchListRequest),
    fork(watchByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest)
  ]);
}

export default accountEmployeeSagas;