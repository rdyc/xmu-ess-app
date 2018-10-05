import { layoutAlertAdd } from '@layout/store/actions';
import {
  PositionAction as Action,
  positionGetAllError,
  positionGetAllRequest,
  positionGetAllSuccess,
  positionGetByIdError,
  positionGetByIdRequest,
  positionGetByIdSuccess,
  positionGetListError,
  positionGetListRequest,
  positionGetListSuccess,
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof positionGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/position${objectToQuerystring(action.payload.filter)}`, 
      success: (response: IApiResponse) => ([
        put(positionGetAllSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(positionGetAllError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(positionGetAllError(error.message)),
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
  const worker = (action: ReturnType<typeof positionGetListRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/position/list${objectToQuerystring(action.payload.filter)}`,
      success: (response: IApiResponse) => ([
        put(positionGetListSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(positionGetListError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(positionGetListError(error.message)),
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
  const worker = (action: ReturnType<typeof positionGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/position/${action.payload.companyUid}/${action.payload.positionUid}`,
      success: (response: IApiResponse) => ([
        put(positionGetByIdSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(positionGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(positionGetByIdError(error.message)),
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

function* positionSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default positionSagas;