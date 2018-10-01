import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import {
  ProjectAction,
  projectGetAllError,
  projectGetAllRequest,
  projectGetAllSuccess,
  projectGetByIdError,
  projectGetByIdRequest,
  projectGetByIdSuccess,
} from '@project/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof projectGetAllRequest>) => { 
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/project/registrations/${action.payload.companyUid}/${action.payload.positionUid}` + objectToQuerystring(action.payload.filter), 
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
  
  yield takeEvery(ProjectAction.GET_ALL_REQUEST, worker);
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

  yield takeEvery(ProjectAction.GET_BY_ID_REQUEST, worker);
}

function* projectSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest)
  ]);
}

export default projectSagas;