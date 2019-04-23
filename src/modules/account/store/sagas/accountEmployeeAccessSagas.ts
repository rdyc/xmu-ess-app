import {
  AccountEmployeeAccessAction as Action,
  accountEmployeeAccessDeleteError,
  accountEmployeeAccessDeleteRequest,
  accountEmployeeAccessDeleteSuccess,
  accountEmployeeAccessGetAllDispose,
  accountEmployeeAccessGetAllError,
  accountEmployeeAccessGetAllRequest,
  accountEmployeeAccessGetAllSuccess,
  accountEmployeeAccessGetByIdDispose,
  accountEmployeeAccessGetByIdError,
  accountEmployeeAccessGetByIdRequest,
  accountEmployeeAccessGetByIdSuccess,
  accountEmployeeAccessGetListDispose,
  accountEmployeeAccessGetListError,
  accountEmployeeAccessGetListRequest,
  accountEmployeeAccessGetListSuccess,
  accountEmployeeAccessPostError,
  accountEmployeeAccessPostRequest,
  accountEmployeeAccessPostSuccess,
  accountEmployeeAccessPutError,
  accountEmployeeAccessPutRequest,
  accountEmployeeAccessPutSuccess,
} from '@account/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd } from '@layout/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeAccessGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.employeeUid}/access?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeAccessGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeAccessGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeAccessGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchListRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeAccessGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.employeeUid}/access/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeAccessGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeAccessGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeAccessGetListError(error.message)),
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
        put(accountEmployeeAccessGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeAccessGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeAccessPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/account/employees/${action.payload.employeeUid}/access`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(accountEmployeeAccessGetByIdDispose()),
        put(accountEmployeeAccessGetAllDispose()),
        put(accountEmployeeAccessGetListDispose()),
        put(accountEmployeeAccessPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(accountEmployeeAccessPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(accountEmployeeAccessPostError(error.message)),
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
  const worker = (action: ReturnType<typeof accountEmployeeAccessPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/account/employees/${action.payload.employeeUid}/access`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(accountEmployeeAccessGetByIdDispose()),
        put(accountEmployeeAccessGetAllDispose()),
        put(accountEmployeeAccessGetListDispose()),
        put(accountEmployeeAccessPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(accountEmployeeAccessPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(accountEmployeeAccessPutError(error.message)),
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
  const worker = (action: ReturnType<typeof accountEmployeeAccessDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'delete',
      path: `/v1/account/employees/${action.payload.employeeUid}/access`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(accountEmployeeAccessGetAllDispose()),
        put(accountEmployeeAccessDeleteSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(accountEmployeeAccessDeleteError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        if (response.status === 400) {
          const errors: any = { 
            // information -> based on form section name
            information: flattenObject(response.body.errors) 
          };
          
          // action.payload.reject(new SubmissionError(response.body.errors));
          action.payload.reject(new SubmissionError(errors));
        } else {
          action.payload.reject(response.statusText);
        }
      },
      errorEffects: (error: TypeError) => [
        put(accountEmployeeAccessDeleteError(error.message)),
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

function* accountEmployeeAccessSagas() {
  yield all([
    fork(watchAllRequest),
    fork(watchListRequest),
    fork(watchByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest)
  ]);
}

export default accountEmployeeAccessSagas;