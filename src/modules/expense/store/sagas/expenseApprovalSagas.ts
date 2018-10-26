import {
  ExpenseApprovalAction as Action,
  expenseApprovalGetAllError,
  expenseApprovalGetAllRequest,
  expenseApprovalGetAllSuccess,
  expenseApprovalGetByIdError,
  expenseApprovalGetByIdRequest,
  expenseApprovalGetByIdSuccess,
  expenseApprovalPostError,
  expenseApprovalPostRequest,
  expenseApprovalPostSuccess,
} from '@expense/store/actions';
import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchApprovalAllFetchRequest() {
  const worker = (action: ReturnType<typeof expenseApprovalGetAllRequest>) => { 
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/expense${objectToQuerystring(action.payload.filter)}`, 
      successEffects: (response: IApiResponse) => ([
        put(expenseApprovalGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(expenseApprovalGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(expenseApprovalGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finallyEffects: [
        put(listBarLoading(false))
      ]
    });
  };
  
  yield takeEvery(Action.APPROVAL_GET_ALL_REQUEST, worker);
}

function* watchApprovalByIdFetchRequest() {
  const worker = (action: ReturnType<typeof expenseApprovalGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/expense/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.expenseUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(expenseApprovalGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(expenseApprovalGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(expenseApprovalGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.APPROVAL_GET_BY_ID_REQUEST, worker);
}

function* watchApprovalPostFetchRequest() {
  const worker = (action: ReturnType<typeof expenseApprovalPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/approvals/expense/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.expenseUid}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(expenseApprovalPostSuccess(response.body)),
      ], 
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(expenseApprovalPostError(response.statusText))
      ], 
      failureCallback: (response: IApiResponse) => {
        if (response.status === 400) {
          const errors: any = { 
            // information -> based form section name
            information: flattenObject(response.body.errors) 
          };

          action.payload.reject(new SubmissionError(errors));
        } else {
          action.payload.reject(response.statusText);
        }
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

function* expenseApprovalSagas() {
  yield all([
    fork(watchApprovalAllFetchRequest),
    fork(watchApprovalByIdFetchRequest),
    fork(watchApprovalPostFetchRequest),
  ]);
}

export default expenseApprovalSagas;