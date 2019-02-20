import {
  ReligionAction as Action,
  religionGetAllError,
  religionGetAllRequest,
  religionGetAllSuccess,
  religionGetByIdError,
  religionGetByIdRequest,
  religionGetByIdSuccess,
  religionGetListError,
  religionGetListRequest,
  religionGetListSuccess,
} from '@common/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof religionGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(religionGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(religionGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(religionGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof religionGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(religionGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(religionGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(religionGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof religionGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}/${action.payload.id}`,
      successEffects: (response: IApiResponse) => ([
        put(religionGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(religionGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(religionGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* commonReligionSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default commonReligionSagas;