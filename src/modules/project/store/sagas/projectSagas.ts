import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import {
  ProjectAction as Action,
  projectGetAllError,
  projectGetAllRequest,
  projectGetAllSuccess,
  projectGetByIdError,
  projectGetByIdRequest,
  projectGetByIdSuccess,
  projectGetListError,
  projectGetListRequest,
  projectGetListSuccess,
  projectPostError,
  projectPostRequest,
  projectPostSuccess,
  projectPutRequest,
} from '@project/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof projectGetAllRequest>) => { 
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/project/registrations/${action.payload.companyUid}/${action.payload.positionUid}${objectToQuerystring(action.payload.filter)}`, 
      success: (response: IApiResponse) => ([
        put(projectGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failed: (response: IApiResponse) => ([
        put(projectGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(projectGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        put(listBarLoading(false))
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchListFetchRequest() {
  const worker = (action: ReturnType<typeof projectGetListRequest>) => { 
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/project/registrations/list${objectToQuerystring(action.payload.filter)}`, 
      success: (response: IApiResponse) => ([
        put(projectGetListSuccess(response.body))
      ]), 
      failed: (response: IApiResponse) => ([
        put(projectGetListError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(projectGetListError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        // nothing
      ])
    });
  };
  
  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchByIdFetchRequest() {
  const worker = (action: ReturnType<typeof projectGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/project/registrations/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.projectUid}`, 
      success: (response: IApiResponse) => ([
        put(projectGetByIdSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(projectGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(projectGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        // nothing
      ])
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostFetchRequest() {
  const worker = (action: ReturnType<typeof projectPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/project/registrations/${action.payload.companyUid}/${action.payload.positionUid}`, 
      payload: action.payload.data, 
      success: (response: IApiResponse) => ([
        put(projectPostSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(projectPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(projectPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        // nothing
      ])
    });
  };

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchPutFetchRequest() {
  const worker = (action: ReturnType<typeof projectPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/project/registrations/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.projectUid}`,
      payload: action.payload.data, 
      success: (response: IApiResponse) => ([
        put(projectPostSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(projectPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(projectPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        // nothing
      ])
    });
  };

  yield takeEvery(Action.PUT_REQUEST, worker);
}

function* projectSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchListFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostFetchRequest),
    fork(watchPutFetchRequest)
  ]);
}

export default projectSagas;