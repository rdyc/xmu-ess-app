import {
  AssessorAction as Action,
  assessorGetAllError,
  assessorGetAllRequest,
  assessorGetAllSuccess,
  assessorGetByIdError,
  assessorGetByIdRequest,
  assessorGetByIdSuccess,
  assessorGetListError,
  assessorGetListRequest,
  assessorGetListSuccess,
} from '@common/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof assessorGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/common/types/${action.payload.category}?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(assessorGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(assessorGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(assessorGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof assessorGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/common/types/${action.payload.category}/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(assessorGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(assessorGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(assessorGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof assessorGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/common/types/${action.payload.category}/${action.payload.id}`,
      successEffects: (response: IApiResponse) => ([
        put(assessorGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(assessorGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(assessorGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* commonAssessorSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default commonAssessorSagas;