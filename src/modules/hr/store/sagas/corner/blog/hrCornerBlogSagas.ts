import {
  HrCornerBlogAction as Action,
  hrCornerBlogGetAllByCategoryDispose,
  hrCornerBlogGetAllByCategoryError,
  hrCornerBlogGetAllByCategoryRequest,
  hrCornerBlogGetAllByCategorySuccess,
  hrCornerBlogGetAllDispose,
  hrCornerBlogGetAllError,
  hrCornerBlogGetAllRequest,
  hrCornerBlogGetAllSuccess,
  hrCornerBlogGetByIdDispose,
  hrCornerBlogGetByIdError,
  hrCornerBlogGetByIdRequest,
  hrCornerBlogGetByIdSuccess,
} from '@hr/store/actions';
import { UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof hrCornerBlogGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host: 'http://10.0.20.150:5000',
      method: 'get',
      path: `/v1/hr/corner?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(hrCornerBlogGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCornerBlogGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCornerBlogGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchAllByCategoryRequest() {
  const worker = (action: ReturnType<typeof hrCornerBlogGetAllByCategoryRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host: 'http://10.0.20.150:5000',
      method: 'get',
      path: `/v1/hr/corner/${action.payload.categorySlug}?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(hrCornerBlogGetAllByCategorySuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCornerBlogGetAllByCategoryError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCornerBlogGetAllByCategoryError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_BY_CATEGORY_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof hrCornerBlogGetByIdRequest>) => {
    return saiyanSaga.fetch({
      host: 'http://10.0.20.150:5000',
      method: 'get',
      path: `/v1/hr/corner/${action.payload.categorySlug}/${action.payload.pageSlug}`,
      successEffects: (response: IApiResponse) => ([
        put(hrCornerBlogGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCornerBlogGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCornerBlogGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() {
    yield all([
      put(hrCornerBlogGetAllDispose()),
      put(hrCornerBlogGetAllByCategoryDispose()),
      put(hrCornerBlogGetByIdDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);

}

function* hrCornerBlogSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchAllByCategoryRequest),
    fork(watchFetchByIdRequest),
    fork(watchSwitchAccess)
  ]);
}

export default hrCornerBlogSagas;