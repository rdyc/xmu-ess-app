import {
  DestinationAction as Action,
  destinationGetAllError,
  destinationGetAllRequest,
  destinationGetAllSuccess,
  destinationGetByIdError,
  destinationGetByIdRequest,
  destinationGetByIdSuccess,
  destinationGetListError,
  destinationGetListRequest,
  destinationGetListSuccess,
} from '@common/store/actions';
import { layoutAlertAdd } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof destinationGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}${objectToQuerystring(action.payload.filter)}`, 
      successEffects: (response: IApiResponse) => ([
        put(destinationGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(destinationGetAllError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(destinationGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof destinationGetListRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}/list${objectToQuerystring(action.payload.filter)}`,
      successEffects: (response: IApiResponse) => ([
        put(destinationGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(destinationGetListError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(destinationGetListError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof destinationGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}/${action.payload.id}`,
      successEffects: (response: IApiResponse) => ([
        put(destinationGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(destinationGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(destinationGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message,
        }))
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* commonDestinationSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default commonDestinationSagas;