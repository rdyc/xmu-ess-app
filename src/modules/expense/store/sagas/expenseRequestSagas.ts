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
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchAllFetchRequest() {
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

function* watchByIdFetchRequest() {
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

function* watchPostFetchRequest() {
  const worker = (action: ReturnType<typeof expenseRequestPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/expense/requests/${action.payload.companyUid}/${action.payload.positionUid}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => ([
        put(expenseRequestPostSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(expenseRequestPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(expenseRequestPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchPutFetchRequest() {
  const worker = (action: ReturnType<typeof expenseRequestPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/expense/requests/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.expenseUid}`,
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => ([
        put(expenseRequestPutSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(expenseRequestPutError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(expenseRequestPutError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.PUT_REQUEST, worker);
}

function* expenseRequestSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostFetchRequest),
    fork(watchPutFetchRequest),
  ]);
}

export default expenseRequestSagas;