import { layoutAlertAdd } from '@layout/store/actions';
import {
  TimesheetApprovalAction as Action,
  timesheetApprovalGetAllDispose,
  timesheetApprovalGetAllError,
  timesheetApprovalGetAllRequest,
  timesheetApprovalGetAllSuccess,
  timesheetApprovalGetByIdDispose,
  timesheetApprovalGetByIdError,
  timesheetApprovalGetByIdRequest,
  timesheetApprovalGetByIdSuccess,
  timesheetApprovalPostBulkError,
  timesheetApprovalPostBulkRequest,
  timesheetApprovalPostBulkSuccess,
  timesheetApprovalPostError,
  timesheetApprovalPostRequest,
  timesheetApprovalPostSuccess,
} from '@timesheet/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof timesheetApprovalGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/timesheet?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(timesheetApprovalGetAllSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(timesheetApprovalGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(timesheetApprovalGetAllError(error.message)),
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
  const worker = (action: ReturnType<typeof timesheetApprovalGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/timesheet/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.timesheetUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(timesheetApprovalGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(timesheetApprovalGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(timesheetApprovalGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof timesheetApprovalPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/approvals/timesheet/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.timesheetUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(timesheetApprovalGetAllDispose()),
        put(timesheetApprovalGetByIdDispose()),
        put(timesheetApprovalPostSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(timesheetApprovalPostError(response.statusText))
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
        put(timesheetApprovalPostError(error.message)),
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

function* watchPostBulkRequest() {
  const worker = (action: ReturnType<typeof timesheetApprovalPostBulkRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/approvals/timesheet/${action.payload.companyUid}/${action.payload.positionUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(timesheetApprovalGetAllDispose()),
        put(timesheetApprovalGetByIdDispose()),
        put(timesheetApprovalPostBulkSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(timesheetApprovalPostBulkError(response.statusText))
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
        put(timesheetApprovalPostBulkError(error.message)),
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

  yield takeEvery(Action.POST_BULK_REQUEST, worker);
}

function* timesheetApprovalSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostRequest),
    fork(watchPostBulkRequest),
    
  ]);
}

export default timesheetApprovalSagas;