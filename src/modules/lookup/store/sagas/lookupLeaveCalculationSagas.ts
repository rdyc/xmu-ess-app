import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';
import {
  LookupLeaveCalculationAction as Action,
  lookupLeaveCalculationGetAllDispose,
  lookupLeaveCalculationGetAllError,
  lookupLeaveCalculationGetAllRequest,
  lookupLeaveCalculationGetAllSuccess,
  lookupLeaveCalculationPostError,
  lookupLeaveCalculationPostRequest,
  lookupLeaveCalculationPostSuccess,
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

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof lookupLeaveCalculationPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/leave/calculate/${action.payload.companyUid}/${action.payload.year}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupLeaveCalculationPostSuccess(response.body)),
        put(lookupLeaveCalculationGetAllDispose()),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupLeaveCalculationPostError(response.statusText)),
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupLeaveCalculationPostError(error.message)),
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

function* lookupLeaveCalculationSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchPostRequest)
  ]);
}

export default lookupLeaveCalculationSagas;
