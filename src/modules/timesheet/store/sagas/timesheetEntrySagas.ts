import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import {
  TimesheetEntryAction as Action,
  timesheetEntryGetAllDispose,
  timesheetEntryGetAllError,
  timesheetEntryGetAllRequest,
  timesheetEntryGetAllSuccess,
  timesheetEntryGetByIdDispose,
  timesheetEntryGetByIdError,
  timesheetEntryGetByIdRequest,
  timesheetEntryGetByIdSuccess,
  timesheetEntryPostError,
  timesheetEntryPostRequest,
  timesheetEntryPostSuccess,
  timesheetEntryPutError,
  timesheetEntryPutRequest,
  timesheetEntryPutSuccess,
} from '@timesheet/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof timesheetEntryGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/timesheet/reports?${params}`, 
      successEffects: (response: IApiResponse) => [
        put(timesheetEntryGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(timesheetEntryGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(timesheetEntryGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof timesheetEntryGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/timesheet/reports/${action.payload.timesheetUid}`, 
      successEffects: (response: IApiResponse) => [
        put(timesheetEntryGetByIdSuccess(response.body)),
      ], 
      failureEffects: (response: IApiResponse) => [
        put(timesheetEntryGetByIdError(response))
      ], 
      errorEffects: (error: TypeError) => [
        put(timesheetEntryGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof timesheetEntryPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/timesheet/reports/${action.payload.companyUid}/${action.payload.positionUid}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(timesheetEntryGetByIdDispose()),
        put(timesheetEntryGetAllDispose()),
        put(timesheetEntryPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      }, 
      failureEffects: (response: IApiResponse) => [
        put(timesheetEntryPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        if (response.status === 400) {
          const errors: any = { 
            // information -> based form section name
            information: flattenObject(response.body.errors) 
          };

          action.payload.reject(new SubmissionError(errors));
        } else {
          action.payload.reject(response.statusText);
        }
      },
      errorEffects: (error: TypeError) => [
        put(timesheetEntryPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof timesheetEntryPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/timesheet/reports/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.timesheetUid}`,
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => ([
        put(timesheetEntryGetByIdDispose()),
        put(timesheetEntryGetAllDispose()),
        put(timesheetEntryPutSuccess(response.body))
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(timesheetEntryPutError(response.statusText)),
      ]),
      failureCallback: (response: IApiResponse) => {
        if (response.status === 400) {
          const errors: any = { 
            // information -> based on form section name
            information: flattenObject(response.body.errors) 
          };
          
          // action.payload.reject(new SubmissionError(response.body.errors));
          action.payload.reject(new SubmissionError(errors));
        } else {
          action.payload.reject(response.statusText);
        }
      }, 
      errorEffects: (error: TypeError) => [
        put(timesheetEntryPutError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
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
      put(timesheetEntryGetAllDispose()),
      put(timesheetEntryGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* timesheetEntrySagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchSwitchAccess)
  ]);
}

export default timesheetEntrySagas;