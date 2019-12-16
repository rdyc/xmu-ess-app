import { listBarLoading, listBarMetadata } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

import {
  LookupLeaveCalculationAction as Action,
  lookupLeaveCalculationGetAllError,
  lookupLeaveCalculationGetAllRequest,
  lookupLeaveCalculationGetAllSuccess,
} from '../actions/lookupLeaveCalculationActions';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof lookupLeaveCalculationGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/account/${action.payload.companyUid}/${action.payload.year}/leaves?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupLeaveCalculationGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupLeaveCalculationGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupLeaveCalculationGetAllError(error.message)),
      ]),
      finallyEffects: [put(listBarLoading(false))]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* lookupLeaveCalculationSagas() {
  yield all([
    fork(watchGetAllRequest),
  ]);
}

export default lookupLeaveCalculationSagas;
