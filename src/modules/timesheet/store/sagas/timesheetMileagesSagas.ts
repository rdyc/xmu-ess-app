import { layoutAlertAdd } from '@layout/store/actions';
import {
  TimesheetMileagesAction as Action,
  timesheetMileagesGetAllError,
  timesheetMileagesGetAllRequest,
  timesheetMileagesGetAllSuccess,
} from '@timesheet/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof timesheetMileagesGetAllRequest>) => { 
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/timesheet/reports/mileages${objectToQuerystring(action.payload.filter)}`, 
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

function* timesheetMileagesSagas() {
  yield all([
    fork(watchAllFetchRequest),
  ]);
}

export default timesheetMileagesSagas;