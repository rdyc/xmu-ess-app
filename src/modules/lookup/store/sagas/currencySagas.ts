import {
  CurrencyAction as Action,
  currencyGetAllError,
  currencyGetAllRequest,
  currencyGetAllSuccess,
  currencyGetByIdError,
  currencyGetByIdRequest,
  currencyGetByIdSuccess,
  currencyGetListError,
  currencyGetListRequest,
  currencyGetListSuccess,
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { objectToQuerystring, IApiResponse } from 'utils';
import { layoutAlertAdd } from '@layout/store/actions';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof currencyGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `POST /v1/lookup/currencies${objectToQuerystring(action.payload.filter)}`, 
      success: (response: IApiResponse) => ([
        put(currencyGetAllSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(currencyGetAllError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(currencyGetAllError(error.message)),
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
  const worker = (action: ReturnType<typeof currencyGetListRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/currencies/list${objectToQuerystring(action.payload.filter)}`,
      success: (response: IApiResponse) => ([
        put(currencyGetListSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(currencyGetListError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(currencyGetListError(error.message)),
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
  const worker = (action: ReturnType<typeof currencyGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/currencies/${action.payload.currencyUid}`,
      success: (response: IApiResponse) => ([
        put(currencyGetByIdSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(currencyGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(currencyGetByIdError(error.message)),
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

function* currencySagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default currencySagas;