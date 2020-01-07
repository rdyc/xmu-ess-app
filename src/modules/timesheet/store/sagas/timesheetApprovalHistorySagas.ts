import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import {
  TimesheetApprovalHistoryAction as Action,
  timesheetApprovalHistoryGetAllDispose,
  timesheetApprovalHistoryGetAllError,
  timesheetApprovalHistoryGetAllRequest,
  timesheetApprovalHistoryGetAllSuccess,
  timesheetApprovalHistoryGetByIdDispose,
  timesheetApprovalHistoryGetByIdError,
  timesheetApprovalHistoryGetByIdRequest,
  timesheetApprovalHistoryGetByIdSuccess,
} from '@timesheet/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof timesheetApprovalHistoryGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/approvals/timesheet?${params}`,
      successEffects: (response: IApiResponse) => [
        put(timesheetApprovalHistoryGetAllSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(timesheetApprovalHistoryGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(timesheetApprovalHistoryGetAllError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ],
      finallyEffects: [

      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof timesheetApprovalHistoryGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/approvals/timesheet/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.timesheetUid}`,
      successEffects: (response: IApiResponse) => [
        put(timesheetApprovalHistoryGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(timesheetApprovalHistoryGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(timesheetApprovalHistoryGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() {
    yield all([
      put(timesheetApprovalHistoryGetAllDispose()),
      put(timesheetApprovalHistoryGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* timesheetApprovalHistorySagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchSwitchAccess)
  ]);
}

export default timesheetApprovalHistorySagas;