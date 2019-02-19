import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import {
  TimesheetMileagesAction as Action,
  timesheetMileagesGetAllDispose,
  timesheetMileagesGetAllError,
  timesheetMileagesGetAllRequest,
  timesheetMileagesGetAllSuccess,
} from '@timesheet/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof timesheetMileagesGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/timesheet/reports/mileages?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(timesheetMileagesGetAllSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(timesheetMileagesGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(timesheetMileagesGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finallyEffects: [
        // put(listBarLoading(false))
      ]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(timesheetMileagesGetAllDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* timesheetMileagesSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchSwitchAccess)
  ]);
}

export default timesheetMileagesSagas;