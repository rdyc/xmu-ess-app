import {
  FinanceApprovalAction as Action,
  financeApprovalBulkPostError,
  financeApprovalBulkPostRequest,
  financeApprovalBulkPostSuccess,
  financeApprovalGetAllDispose,
  financeApprovalGetAllError,
  financeApprovalGetAllRequest,
  financeApprovalGetAllSuccess,
  financeApprovalGetByIdDispose,
  financeApprovalGetByIdError,
  financeApprovalGetByIdRequest,
  financeApprovalGetByIdSuccess,
  financeApprovalPostError,
  financeApprovalPostRequest,
  financeApprovalPostSuccess,
} from '@finance/store/actions';
import { layoutAlertAdd } from '@layout/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof financeApprovalGetAllRequest>) => { 
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/finance/${action.payload.companyUid}/${action.payload.positionUid}?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(financeApprovalGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(financeApprovalGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(financeApprovalGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finallyEffects: [
      ]
    });
  };
  
  yield takeEvery(Action.APPROVAL_GET_ALL_REQUEST, worker);
}

function* watchByIdFetchRequest() {
  const worker = (action: ReturnType<typeof financeApprovalGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/finance/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.financeUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(financeApprovalGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(financeApprovalGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(financeApprovalGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.APPROVAL_GET_BY_ID_REQUEST, worker);
}

function* watchPostFetchRequest() {
  const worker = (action: ReturnType<typeof financeApprovalPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/approvals/finance/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.financeUid}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(financeApprovalGetAllDispose()),
        put(financeApprovalGetByIdDispose()),
        put(financeApprovalPostSuccess(response.body))
      ], 
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(financeApprovalPostError(response.statusText))
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
        put(financeApprovalPostError(error.message)),
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

function* watchBulkPostFetchRequest() {
  const worker = (action: ReturnType<typeof financeApprovalBulkPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/approvals/finance/${action.payload.companyUid}/${action.payload.positionUid}`,
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(financeApprovalGetAllDispose()),
        put(financeApprovalGetByIdDispose()),
        put(financeApprovalBulkPostSuccess(response.body))
      ], 
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(financeApprovalBulkPostError(response.statusText))
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
        put(financeApprovalBulkPostError(error.message)),
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

  yield takeEvery(Action.APPROVAL_BULK_POST_REQUEST, worker);
}

function* financeSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostFetchRequest),
    fork(watchBulkPostFetchRequest)
  ]);
}

export default financeSagas;