import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
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
      path: `/v1/lookup/positions${objectToQuerystring(action.payload.filter)}`, 
      successEffects: (response: IApiResponse) => ([
        put(positionGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(positionGetAllError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(positionGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finallyEffects: [put(listBarLoading(false))]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof positionGetListRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/positions/list${objectToQuerystring(action.payload.filter)}`,
      successEffects: (response: IApiResponse) => ([
        put(positionGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(positionGetListError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(positionGetListError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof positionGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/positions/${action.payload.companyUid}/${action.payload.positionUid}`,
      successEffects: (response: IApiResponse) => ([
        put(positionGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(positionGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(positionGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message,
        }))
      ]),
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