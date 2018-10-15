import {
  CustomerAction as Action,
  customerGetAllError,
  customerGetAllRequest,
  customerGetAllSuccess,
  customerGetByIdError,
  customerGetByIdRequest,
  customerGetByIdSuccess,
  customerGetListError,
  customerGetListRequest,
  customerGetListSuccess,
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { objectToQuerystring, IApiResponse } from 'utils';
import { layoutAlertAdd } from '@layout/store/actions';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof customerGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/customers${objectToQuerystring(action.payload.filter)}`, 
      success: (response: IApiResponse) => ([
        put(customerGetAllSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(customerGetAllError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(customerGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof customerGetListRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/customers/list${objectToQuerystring(action.payload.filter)}`,
      success: (response: IApiResponse) => ([
        put(customerGetListSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(customerGetListError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(customerGetListError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof customerGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/customers/${action.payload.companyUid}/${action.payload.customerUid}`,
      success: (response: IApiResponse) => ([
        put(customerGetByIdSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(customerGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(customerGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message,
        }))
      ]),
      finally: () => ([])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* customerSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default customerSagas;