import { layoutAlertAdd } from '@layout/store/actions';
import {
  SystemLimitAction as Action,
  systemLimitGetAllError,
  systemLimitGetAllRequest,
  systemLimitGetAllSuccess,
  systemLimitGetByIdError,
  systemLimitGetByIdRequest,
  systemLimitGetByIdSuccess,
  systemLimitGetListError,
  systemLimitGetListRequest,
  systemLimitGetListSuccess,
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof systemLimitGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/systemlimits${objectToQuerystring(action.payload.filter)}`, 
      success: (response: IApiResponse) => ([
        put(systemLimitGetAllSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(systemLimitGetAllError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(systemLimitGetAllError(error.message)),
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
  const worker = (action: ReturnType<typeof systemLimitGetListRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/systemlimits/list${objectToQuerystring(action.payload.filter)}`,
      success: (response: IApiResponse) => ([
        put(systemLimitGetListSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(systemLimitGetListError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(systemLimitGetListError(error.message)),
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
  const worker = (action: ReturnType<typeof systemLimitGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/systemlimits/${action.payload.companyUid}/${action.payload.systemLimitUid}`,
      success: (response: IApiResponse) => ([
        put(systemLimitGetByIdSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(systemLimitGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(systemLimitGetByIdError(error.message)),
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

function* systemLimitSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default systemLimitSagas;