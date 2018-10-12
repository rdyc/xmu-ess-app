import {
  ExpenseAction as Action,
  expenseApprovalGetAllError,
  expenseApprovalGetAllRequest,
  expenseApprovalGetAllSuccess,
  expenseApprovalGetByIdError,
  expenseApprovalGetByIdRequest,
  expenseApprovalGetByIdSuccess,
  expenseApprovalPostError,
  expenseApprovalPostRequest,
  expenseApprovalPostSuccess,
  expenseGetAllError,
  expenseGetAllRequest,
  expenseGetAllSuccess,
  expenseGetByIdError,
  expenseGetByIdRequest,
  expenseGetByIdSuccess,
  expensePostError,
  expensePostRequest,
  expensePostSuccess,
  expensePutError,
  expensePutRequest,
  expensePutSuccess,
} from '@expense/store/actions';
import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof expenseGetAllRequest>) => { 
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/expense${objectToQuerystring(action.payload.filter)}`, 
      success: (response: IApiResponse) => ([
        put(expenseGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failed: (response: IApiResponse) => ([
        put(expenseGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(expenseGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        put(listBarLoading(false))
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchByIdFetchRequest() {
  const worker = (action: ReturnType<typeof expenseGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/expense/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.expenseUid}`, 
      success: (response: IApiResponse) => ([
        put(expenseGetByIdSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(expenseGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(expenseGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        // nothing
      ])
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostFetchRequest() {
  const worker = (action: ReturnType<typeof expensePostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/expense/${action.payload.companyUid}/${action.payload.positionUid}`, 
      payload: action.payload.data, 
      success: (response: IApiResponse) => ([
        put(expensePostSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(expensePostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(expensePostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        // nothing
      ])
    });
  };

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchPutFetchRequest() {
  const worker = (action: ReturnType<typeof expensePutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/expense/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.expenseUid}`,
      payload: action.payload.data, 
      success: (response: IApiResponse) => ([
        put(expensePutSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(expensePutError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(expensePutError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        // nothing
      ])
    });
  };

  yield takeEvery(Action.PUT_REQUEST, worker);
}

function* watchApprovalAllFetchRequest() {
  const worker = (action: ReturnType<typeof expenseApprovalGetAllRequest>) => { 
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/expense${objectToQuerystring(action.payload.filter)}`, 
      success: (response: IApiResponse) => ([
        put(expenseApprovalGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failed: (response: IApiResponse) => ([
        put(expenseApprovalGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(expenseApprovalGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        put(listBarLoading(false))
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchApprovalByIdFetchRequest() {
  const worker = (action: ReturnType<typeof expenseApprovalGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/expense/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.expenseUid}`, 
      success: (response: IApiResponse) => ([
        put(expenseApprovalGetByIdSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(expenseApprovalGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(expenseApprovalGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        // nothing
      ])
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchApprovalPostFetchRequest() {
  const worker = (action: ReturnType<typeof expenseApprovalPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/approvals/expense/${action.payload.companyUid}/${action.payload.positionUid}`, 
      payload: action.payload.data, 
      success: (response: IApiResponse) => ([
        put(expenseApprovalPostSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(expenseApprovalPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(expenseApprovalPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        // nothing
      ])
    });
  };

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* expenseSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostFetchRequest),
    fork(watchPutFetchRequest),
    fork(watchApprovalAllFetchRequest),
    fork(watchApprovalByIdFetchRequest),
    fork(watchApprovalPostFetchRequest),
  ]);
}

export default expenseSagas;