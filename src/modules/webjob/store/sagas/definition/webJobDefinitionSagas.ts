import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { 
  WebJobDefinitionAction as Action,
  webJobDefinitionDeleteError, webJobDefinitionDeleteRequest, webJobDefinitionDeleteSuccess, 
  webJobDefinitionGetAllDispose, webJobDefinitionGetAllError, webJobDefinitionGetAllRequest, 
  webJobDefinitionGetAllSuccess, webJobDefinitionGetByIdDispose, webJobDefinitionGetByIdError, 
  webJobDefinitionGetByIdRequest, webJobDefinitionGetByIdSuccess, webJobDefinitionGetListDispose, 
  webJobDefinitionGetListError, webJobDefinitionGetListRequest, webJobDefinitionGetListSuccess, webJobDefinitionJobGetAllDispose, webJobDefinitionJobGetAllError, webJobDefinitionJobGetAllRequest, 
  webJobDefinitionJobGetAllSuccess, webJobDefinitionJobGetListDispose, webJobDefinitionJobGetListError, 
  webJobDefinitionJobGetListRequest, webJobDefinitionJobGetListSuccess, webJobDefinitionPostError, 
  webJobDefinitionPostRequest, webJobDefinitionPostSuccess 
} from '@webjob/store/actions';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { envHelper, IApiResponse, IFieldEnvHelper } from 'utils';

const hostname: string = document && document.location && document.location.hostname || process.env.REACT_APP_HOST_LOCAL || '';

const host = envHelper(IFieldEnvHelper.WebJobApiUrl, hostname);

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof webJobDefinitionGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host,
      method: 'GET',
      path: `/api/v1/definitions?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(webJobDefinitionGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(webJobDefinitionGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(webJobDefinitionGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof webJobDefinitionGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host,
      method: 'GET',
      path: `/api/v1/definitions/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(webJobDefinitionGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(webJobDefinitionGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(webJobDefinitionGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof webJobDefinitionGetByIdRequest>) => {
    return saiyanSaga.fetch({
      host,
      method: 'GET',
      path: `/api/v1/definitions/${action.payload.definitionUid}`,
      successEffects: (response: IApiResponse) => ([
        put(webJobDefinitionGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(webJobDefinitionGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(webJobDefinitionGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof webJobDefinitionPostRequest>) => {
    const data = new FormData();

    data.append('package', action.payload.data.package[0]);

    return saiyanSaga.fetch({
      host,
      method: 'POST',
      path: `/api/v1/definitions`,
      payload: data,
      isJsonContent: false,
      successEffects: (response: IApiResponse) => [
        put(webJobDefinitionGetByIdDispose()),
        put(webJobDefinitionGetAllDispose()),
        put(webJobDefinitionPostSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(webJobDefinitionPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(webJobDefinitionPostError(error.message)),
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

function* watchDeleteRequest() {
  const worker = (action: ReturnType<typeof webJobDefinitionDeleteRequest>) => {
    return saiyanSaga.fetch({
      host,
      method: 'DELETE',
      path: `/api/v1/definitions`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(webJobDefinitionGetByIdDispose()),
        put(webJobDefinitionGetAllDispose()),
        put(webJobDefinitionDeleteSuccess()),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve();
      },
      failureEffects: (response: IApiResponse) => [
        put(webJobDefinitionDeleteError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(webJobDefinitionDeleteError(error.message)),
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

  yield takeEvery(Action.DELETE_REQUEST, worker);
}

function* watchFetchAllJobRequest() {
  const worker = (action: ReturnType<typeof webJobDefinitionJobGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host,
      method: 'GET',
      path: `/api/v1/definitions/${action.payload.definitionUid}/jobs?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(webJobDefinitionJobGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(webJobDefinitionJobGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(webJobDefinitionJobGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.JOB_GET_ALL_REQUEST, worker);
}

function* watchFetchListJobRequest() {
  const worker = (action: ReturnType<typeof webJobDefinitionJobGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host,
      method: 'GET',
      path: `/api/v1/definitions/${action.payload.definitionUid}/jobs/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(webJobDefinitionJobGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(webJobDefinitionJobGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(webJobDefinitionJobGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.JOB_GET_LIST_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() {
    yield all([
      put(webJobDefinitionGetAllDispose()),
      put(webJobDefinitionGetListDispose()),
      put(webJobDefinitionGetByIdDispose()),
      put(webJobDefinitionJobGetAllDispose()),
      put(webJobDefinitionJobGetListDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);

}

function* webJobDefinitionSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
    fork(watchPostRequest),
    fork(watchDeleteRequest),
    fork(watchFetchAllJobRequest),
    fork(watchFetchListJobRequest),
    fork(watchSwitchAccess)
  ]);
}

export default webJobDefinitionSagas;