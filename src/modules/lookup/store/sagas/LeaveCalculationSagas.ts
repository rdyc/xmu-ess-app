import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';
import { LeaveCalculationAction as Action,
         leaveCalculationGetAllError, 
         leaveCalculationGetAllRequest, 
         leaveCalculationGetAllSuccess } from '../actions/leaveCalculationActions';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof leaveCalculationGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.companyUid}/${action.payload.year}/leaves${objectToQuerystring(action.payload.filter)}`,
      successEffects: (response: IApiResponse) => ([
        put(leaveCalculationGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(leaveCalculationGetAllError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(leaveCalculationGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finallyEffects: [put(listBarLoading(false))]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* leaveCalculationSagas() {
  yield all([
    fork(watchGetAllRequest),
  ]);
}

export default leaveCalculationSagas;