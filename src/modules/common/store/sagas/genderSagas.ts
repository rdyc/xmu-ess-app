import {
  GenderAction as Action,
  genderGetAllError,
  genderGetAllRequest,
  genderGetAllSuccess,
  genderGetByIdError,
  genderGetByIdRequest,
  genderGetByIdSuccess,
  genderGetListError,
  genderGetListRequest,
  genderGetListSuccess,
} from '@common/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof genderGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/common/types/${action.payload.category}?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(genderGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(genderGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(genderGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof genderGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/common/types/${action.payload.category}/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(genderGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(genderGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(genderGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof genderGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/common/types/${action.payload.category}/${action.payload.id}`,
      successEffects: (response: IApiResponse) => ([
        put(genderGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(genderGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(genderGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* commonGenderSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default commonGenderSagas;