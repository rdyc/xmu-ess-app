import { layoutAlertAdd } from '@layout/store/actions';
import {
  MenuAction as Action,
  menuGetAllError,
  menuGetAllRequest,
  menuGetAllSuccess,
  menuGetByIdError,
  menuGetByIdRequest,
  menuGetByIdSuccess,
  menuGetListError,
  menuGetListRequest,
  menuGetListSuccess,
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof menuGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/menu${objectToQuerystring(action.payload.filter)}`, 
      success: (response: IApiResponse) => ([
        put(menuGetAllSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(menuGetAllError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(menuGetAllError(error.message)),
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
  const worker = (action: ReturnType<typeof menuGetListRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/menu/list${objectToQuerystring(action.payload.filter)}`,
      success: (response: IApiResponse) => ([
        put(menuGetListSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(menuGetListError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(menuGetListError(error.message)),
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
  const worker = (action: ReturnType<typeof menuGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/menu/${action.payload.menuUid}`,
      success: (response: IApiResponse) => ([
        put(menuGetByIdSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(menuGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(menuGetByIdError(error.message)),
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

function* menuSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default menuSagas;