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
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof destinationGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/common/types/${action.payload.category}?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(destinationGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(destinationGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(destinationGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof destinationGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/common/types/${action.payload.category}/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(destinationGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(destinationGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(destinationGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof destinationGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/common/types/${action.payload.category}/${action.payload.id}`,
      successEffects: (response: IApiResponse) => ([
        put(destinationGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(destinationGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(destinationGetByIdError(error.message)),
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