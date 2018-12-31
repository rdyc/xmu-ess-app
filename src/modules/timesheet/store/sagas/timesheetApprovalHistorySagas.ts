import { layoutAlertAdd } from '@layout/store/actions';
import {
  TimesheetApprovalHistoryAction as Action,
  timesheetApprovalHistoryGetAllError,
  timesheetApprovalHistoryGetAllRequest,
  timesheetApprovalHistoryGetAllSuccess,
  timesheetApprovalHistoryGetByIdError,
  timesheetApprovalHistoryGetByIdRequest,
  timesheetApprovalHistoryGetByIdSuccess,
} from '@timesheet/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof timesheetApprovalHistoryGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/timesheet?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(timesheetApprovalHistoryGetAllSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(timesheetApprovalHistoryGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(timesheetApprovalHistoryGetAllError(error.message)),
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
  const worker = (action: ReturnType<typeof timesheetApprovalHistoryGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/timesheet/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.timesheetUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(timesheetApprovalHistoryGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(timesheetApprovalHistoryGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(timesheetApprovalHistoryGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* timesheetApprovalHistorySagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
  ]);
}

export default timesheetApprovalHistorySagas;