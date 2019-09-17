import {
  HrCompetencyMappedAction as Action,
  hrCompetencyMappedGetAllDispose,
  hrCompetencyMappedGetAllError,
  hrCompetencyMappedGetAllRequest,
  hrCompetencyMappedGetAllSuccess,
  hrCompetencyMappedGetByIdDispose,
  hrCompetencyMappedGetByIdError,
  hrCompetencyMappedGetByIdRequest,
  hrCompetencyMappedGetByIdSuccess,
  hrCompetencyMappedGetListDispose,
  hrCompetencyMappedGetListError,
  hrCompetencyMappedGetListRequest,
  hrCompetencyMappedGetListSuccess,
  hrCompetencyMappedPostError,
  hrCompetencyMappedPostRequest,
  hrCompetencyMappedPostSuccess,
  hrCompetencyMappedPutError,
  hrCompetencyMappedPutRequest,
  hrCompetencyMappedPutSuccess,
} from '@hr/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyMappedGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/mappeds?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyMappedGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyMappedGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyMappedGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyMappedGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/mappeds/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyMappedGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyMappedGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyMappedGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyMappedGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/mappeds/${action.payload.mappedUid}`,
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyMappedGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyMappedGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyMappedGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyMappedPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/mappeds`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCompetencyMappedGetByIdDispose()),
        put(hrCompetencyMappedGetAllDispose()),
        put(hrCompetencyMappedPostSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCompetencyMappedPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCompetencyMappedPostError(error.message)),
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

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyMappedPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/mappeds/${action.payload.mappedUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCompetencyMappedGetByIdDispose()),
        put(hrCompetencyMappedGetAllDispose()),
        put(hrCompetencyMappedPutSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCompetencyMappedPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCompetencyMappedPutError(error.message)),
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

  yield takeEvery(Action.PUT_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() {
    yield all([
      put(hrCompetencyMappedGetAllDispose()),
      put(hrCompetencyMappedGetListDispose()),
      put(hrCompetencyMappedGetByIdDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* hrCompetencyMappedSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchSwitchAccess)
  ]);
}

export default hrCompetencyMappedSagas;