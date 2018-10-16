import { layoutAlertAdd } from '@layout/store/actions';
import {
  DiemAction as Action,
  diemGetAllError,
  diemGetAllRequest,
  diemGetAllSuccess,
  diemGetByIdError,
  diemGetByIdRequest,
  diemGetByIdSuccess,
  diemGetListError,
  diemGetListRequest,
  diemGetListSuccess,
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof diemGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/diems${objectToQuerystring(action.payload.filter)}`, 
      success: (response: IApiResponse) => ([
        put(diemGetAllSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(diemGetAllError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(diemGetAllError(error.message)),
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
  const worker = (action: ReturnType<typeof diemGetListRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/diems/list${objectToQuerystring(action.payload.filter)}`,
      success: (response: IApiResponse) => ([
        put(diemGetListSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(diemGetListError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(diemGetListError(error.message)),
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
  const worker = (action: ReturnType<typeof diemGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/diems/${action.payload.companyUid}/${action.payload.diemUid}`,
      success: (response: IApiResponse) => ([
        put(diemGetByIdSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(diemGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(diemGetByIdError(error.message)),
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

function* diemSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default diemSagas;