import {
  ExpenseRequestAction as Action,
  expenseRequestGetAllError,
  expenseRequestGetAllRequest,
  expenseRequestGetAllSuccess,
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
import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchAllRequest() {
  const worker = (action: ReturnType<typeof expenseRequestGetAllRequest>) => { 
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/expense/requests${objectToQuerystring(action.payload.filter)}`, 
      successEffects: (response: IApiResponse) => ([
        put(expenseRequestGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(expenseRequestGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(expenseRequestGetAllError(error.message)),
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
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchByIdRequest() {
  const worker = (action: ReturnType<typeof expenseRequestGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/expense/requests/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.expenseUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(expenseRequestGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(expenseRequestGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(expenseRequestGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof expenseRequestPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/expense/requests/${action.payload.companyUid}/${action.payload.positionUid}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(expenseRequestPostSuccess(response.body)),
      ], 
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(expenseRequestPostError(response.statusText)),
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
      method: 'put',
      path: `/v1/expense/requests/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.expenseUid}`,
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(expenseRequestPutSuccess(response.body)),
      ], 
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(expenseRequestPutError(response.statusText))
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

function* expenseRequestSagas() {
  yield all([
    fork(watchAllRequest),
    fork(watchByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
  ]);
}

export default expenseRequestSagas;