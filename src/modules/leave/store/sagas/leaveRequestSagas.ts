import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import {
  LeaveRequestAction as Action,
  leaveRequestGetAllError,
  leaveRequestGetAllRequest,
  leaveRequestGetAllSuccess,
  leaveRequestGetByIdError,
  leaveRequestGetByIdRequest,
  leaveRequestGetByIdSuccess,
  leaveRequestPostSuccess,
  leaveRequestPostError,
  leaveRequestPostRequest,
  leaveRequestPutRequest,
} from '@leave/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof leaveRequestGetAllRequest>) => { 
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/leave/requests/`+ objectToQuerystring(action.payload.filter), 
      success: (response: IApiResponse) => ([
        put(leaveRequestGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failed: (response: IApiResponse) => ([
        put(leaveRequestGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(leaveRequestGetAllError(error.message)),
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

function* watchByIdFetchRequest() {
  const worker = (action: ReturnType<typeof leaveRequestGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/leave/requests/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.leaveRequestUid}`, 
      success: (response: IApiResponse) => ([
        put(leaveRequestGetByIdSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(leaveRequestGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(leaveRequestGetByIdError(error.message)),
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
  const worker = (action: ReturnType<typeof leaveRequestPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/leave/requests/${action.payload.companyUid}/${action.payload.positionUid}`, 
      payload: action.payload.data, 
      success: (response: IApiResponse) => ([
        put(leaveRequestPostSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(leaveRequestPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(leaveRequestPostError(error.message)),
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
  const worker = (action: ReturnType<typeof leaveRequestPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/leave/requests/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.leaveRequestUid}`,
      payload: action.payload.data, 
      success: (response: IApiResponse) => ([
        put(leaveRequestPostSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(leaveRequestPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(leaveRequestPostError(error.message)),
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

function* leaveRequestSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostFetchRequest),
    fork(watchPutFetchRequest)
  ]);
}

export default leaveRequestSagas;