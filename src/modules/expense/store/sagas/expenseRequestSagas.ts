import {
  ExpenseRequestAction as Action,
  expenseRequestGetAllDispose,
  expenseRequestGetAllError,
  expenseRequestGetAllRequest,
  expenseRequestGetAllSuccess,
  expenseRequestGetByIdDispose,
  expenseRequestGetByIdError,
  expenseRequestGetByIdRequest,
  expenseRequestGetByIdSuccess,
  expenseRequestPostError,
  expenseRequestPostRequest,
  expenseRequestPostSuccess,
  expenseRequestPutError,
  expenseRequestPutRequest,
  expenseRequestPutSuccess,
} from '@expense/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllRequest() {
  const worker = (action: ReturnType<typeof expenseRequestGetAllRequest>) => { 
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/expense/requests?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(expenseRequestGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(expenseRequestGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(expenseRequestGetAllError(error.message)),
      ]),
      finallyEffects: [
      ]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchByIdRequest() {
  const worker = (action: ReturnType<typeof expenseRequestGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/expense/requests/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.expenseUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(expenseRequestGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(expenseRequestGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(expenseRequestGetByIdError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof expenseRequestPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/expense/requests/${action.payload.companyUid}/${action.payload.positionUid}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(expenseRequestGetAllDispose()),
        put(expenseRequestGetByIdDispose()),
        put(expenseRequestPostSuccess(response.body))
      ], 
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(expenseRequestPostError(response.statusText)),
      ], 
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(expenseRequestPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof expenseRequestPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'PUT',
      path: `/v1/expense/requests/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.expenseUid}`,
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(expenseRequestGetAllDispose()),
        put(expenseRequestGetByIdDispose()),
        put(expenseRequestPutSuccess(response.body))
      ], 
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(expenseRequestPutError(response.statusText))
      ], 
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(expenseRequestPutError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.PUT_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(expenseRequestGetAllDispose()),
      put(expenseRequestGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* expenseRequestSagas() {
  yield all([
    fork(watchAllRequest),
    fork(watchByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchSwitchAccess),
  ]);
}

export default expenseRequestSagas;