import { layoutAlertAdd } from '@layout/store/actions';
import {
  TimesheetEntryAction as Action,
  timesheetGetAllDispose,
  timesheetGetAllError,
  timesheetGetAllRequest,
  timesheetGetAllSuccess,
  timesheetGetByIdDispose,
  timesheetGetByIdError,
  timesheetGetByIdRequest,
  timesheetGetByIdSuccess,
  timesheetPostError,
  timesheetPostRequest,
  timesheetPostSuccess,
  timesheetPutError,
  timesheetPutRequest,
  timesheetPutSuccess,
} from '@timesheet/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof timesheetGetAllRequest>) => { 
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/timesheet/reports${objectToQuerystring(action.payload.filter)}`, 
      successEffects: (response: IApiResponse) => ([
        put(timesheetGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(timesheetGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(timesheetGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finallyEffects: [

      ]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchByIdFetchRequest() {
  const worker = (action: ReturnType<typeof timesheetGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/timesheet/reports/${action.payload.timesheetUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(timesheetGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(timesheetGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(timesheetGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostFetchRequest() {
  const worker = (action: ReturnType<typeof timesheetPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/timesheet/reports/${action.payload.companyUid}/${action.payload.positionUid}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(timesheetGetAllDispose()),
        put(timesheetPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      }, 
      failureEffects: (response: IApiResponse) => [
        put(timesheetPostError(response.statusText))
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
        put(timesheetPostError(error.message)),
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

function* watchPutFetchRequest() {
  const worker = (action: ReturnType<typeof timesheetPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/timesheet/reports/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.timesheetUid}`,
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => ([
        put(timesheetPutSuccess(response.body)),
        put(timesheetGetByIdDispose()),
        put(timesheetGetAllDispose())
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(timesheetPutError(response.statusText)),
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
        put(timesheetPutError(error.message)),
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

function* timesheetEntrySagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostFetchRequest),
    fork(watchPutFetchRequest)
  ]);
}

export default timesheetEntrySagas;