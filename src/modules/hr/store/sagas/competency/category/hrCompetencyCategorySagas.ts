import {
  HrCompetencyCategoryAction as Action,
  hrCompetencyCategoryGetAllDispose,
  hrCompetencyCategoryGetAllError,
  hrCompetencyCategoryGetAllRequest,
  hrCompetencyCategoryGetAllSuccess,
  hrCompetencyCategoryGetByIdDispose,
  hrCompetencyCategoryGetByIdError,
  hrCompetencyCategoryGetByIdRequest,
  hrCompetencyCategoryGetByIdSuccess,
  hrCompetencyCategoryGetListDispose,
  hrCompetencyCategoryGetListError,
  hrCompetencyCategoryGetListRequest,
  hrCompetencyCategoryGetListSuccess,
  hrCompetencyCategoryPatchError,
  hrCompetencyCategoryPatchRequest,
  hrCompetencyCategoryPatchSuccess,
  hrCompetencyCategoryPostError,
  hrCompetencyCategoryPostRequest,
  hrCompetencyCategoryPostSuccess,
} from '@hr/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyCategoryGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/hr/competency/cluster/${action.payload.clusterUid}/categories?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyCategoryGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyCategoryGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyCategoryGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyCategoryGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/hr/competency/cluster/${action.payload.clusterUid}/categories/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyCategoryGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyCategoryGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyCategoryGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyCategoryGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/hr/competency/cluster/${action.payload.clusterUid}/categories/${action.payload.categoryUid}`,
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyCategoryGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyCategoryGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyCategoryGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyCategoryPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/hr/competency/cluster/${action.payload.clusterUid}/categories/${action.payload.categoryUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCompetencyCategoryGetByIdDispose()),
        put(hrCompetencyCategoryGetAllDispose()),
        put(hrCompetencyCategoryPostSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCompetencyCategoryPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCompetencyCategoryPostError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchPatchRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyCategoryPatchRequest>) => {
    return saiyanSaga.fetch({
      method: 'PATCH',
      path: `/v1/hr/competency/cluster/${action.payload.clusterUid}/categories/${action.payload.categoryUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCompetencyCategoryGetByIdDispose()),
        put(hrCompetencyCategoryGetAllDispose()),
        put(hrCompetencyCategoryPatchSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCompetencyCategoryPatchError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCompetencyCategoryPatchError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.PATCH_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() {
    yield all([
      put(hrCompetencyCategoryGetAllDispose()),
      put(hrCompetencyCategoryGetListDispose()),
      put(hrCompetencyCategoryGetByIdDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);

}
function* hrCompetencyCategorySagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
    fork(watchPostRequest),
    fork(watchPatchRequest),
    fork(watchSwitchAccess)
  ]);
}

export default hrCompetencyCategorySagas;