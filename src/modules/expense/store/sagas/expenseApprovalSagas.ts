import {
  ExpenseApprovalAction as Action,
  expenseApprovalGetAllDispose,
  expenseApprovalGetAllError,
  expenseApprovalGetAllRequest,
  expenseApprovalGetAllSuccess,
  expenseApprovalGetByIdDispose,
  expenseApprovalGetByIdError,
  expenseApprovalGetByIdRequest,
  expenseApprovalGetByIdSuccess,
  expenseApprovalPostError,
  expenseApprovalPostRequest,
  expenseApprovalPostSuccess,
} from '@expense/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchApprovalAllFetchRequest() {
  const worker = (action: ReturnType<typeof expenseApprovalGetAllRequest>) => { 
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/approvals/expense?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(expenseApprovalGetAllSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(expenseApprovalGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(expenseApprovalGetAllError(error.message)),
      ]),
      finallyEffects: [
      ]
    });
  };
  
  yield takeEvery(Action.APPROVAL_GET_ALL_REQUEST, worker);
}

function* watchApprovalByIdFetchRequest() {
  const worker = (action: ReturnType<typeof expenseApprovalGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/approvals/expense/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.expenseUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(expenseApprovalGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(expenseApprovalGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(expenseApprovalGetByIdError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.APPROVAL_GET_BY_ID_REQUEST, worker);
}

function* watchApprovalPostFetchRequest() {
  const worker = (action: ReturnType<typeof expenseApprovalPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/approvals/expense/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.expenseUid}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(expenseApprovalGetAllDispose()),
        put(expenseApprovalGetByIdDispose()),
        put(expenseApprovalPostSuccess(response.body)),
      ], 
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(expenseApprovalPostError(response.statusText))
      ], 
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(expenseApprovalPostError(error.message)),
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

  yield takeEvery(Action.APPROVAL_POST_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(expenseApprovalGetAllDispose()),
      put(expenseApprovalGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* expenseApprovalSagas() {
  yield all([
    fork(watchApprovalAllFetchRequest),
    fork(watchApprovalByIdFetchRequest),
    fork(watchApprovalPostFetchRequest),
    fork(watchSwitchAccess),
  ]);
}

export default expenseApprovalSagas;