import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import {
  TimesheetAction as Action,
  timesheetGetAllError,
  timesheetGetAllRequest,
  timesheetGetAllSuccess,
  timesheetGetByIdError,
  timesheetGetByIdRequest,
  timesheetGetByIdSuccess,
  timesheetPostError,
  timesheetPostRequest,
  timesheetPostSuccess,
  timesheetPutRequest,
} from '@timesheet/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof timesheetGetAllRequest>) => { 
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/timesheet/report/${action.payload.companyUid}/${action.payload.positionUid}${objectToQuerystring(action.payload.filter)}`, 
      success: (response: IApiResponse) => ([
        put(timesheetGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failed: (response: IApiResponse) => ([
        put(timesheetGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(timesheetGetAllError(error.message)),
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
  const worker = (action: ReturnType<typeof timesheetGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/timesheet/reports/${action.payload.timesheetUid}`, 
      success: (response: IApiResponse) => ([
        put(timesheetGetByIdSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(timesheetGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(timesheetGetByIdError(error.message)),
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
  const worker = (action: ReturnType<typeof timesheetPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/timesheet/reports${action.payload.companyUid}/${action.payload.positionUid}`, 
      payload: action.payload.data, 
      success: (response: IApiResponse) => ([
        put(timesheetPostSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(timesheetPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(timesheetPostError(error.message)),
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
  const worker = (action: ReturnType<typeof timesheetPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/timesheet/report/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.timesheetUid}`,
      payload: action.payload.data, 
      success: (response: IApiResponse) => ([
        put(timesheetPostSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(timesheetPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(timesheetPostError(error.message)),
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

function* timesheetSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostFetchRequest),
    fork(watchPutFetchRequest)
  ]);
}

export default timesheetSagas;