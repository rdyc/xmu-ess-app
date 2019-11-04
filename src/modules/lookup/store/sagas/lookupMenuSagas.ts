import {
  LookupMenuAction as Action,
  lookupMenuGetAllError,
  lookupMenuGetAllRequest,
  lookupMenuGetAllSuccess,
  lookupMenuGetByIdError,
  lookupMenuGetByIdRequest,
  lookupMenuGetByIdSuccess,
  lookupMenuGetListError,
  lookupMenuGetListRequest,
  lookupMenuGetListSuccess,
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof lookupMenuGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/lookup/menu?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(lookupMenuGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupMenuGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupMenuGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof lookupMenuGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/lookup/menu/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupMenuGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupMenuGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupMenuGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof lookupMenuGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/lookup/menu/${action.payload.menuUid}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupMenuGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupMenuGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupMenuGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* lookupMenuSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default lookupMenuSagas;