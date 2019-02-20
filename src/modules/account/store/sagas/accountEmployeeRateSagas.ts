import {
  AccountEmployeeRateAction as Action,
  accountEmployeeRateGetAllDispose,
  accountEmployeeRateGetAllError,
  accountEmployeeRateGetAllRequest,
  accountEmployeeRateGetAllSuccess,
  accountEmployeeRateGetByIdDispose,
  accountEmployeeRateGetByIdError,
  accountEmployeeRateGetByIdRequest,
  accountEmployeeRateGetByIdSuccess,
  accountEmployeeRateGetListError,
  accountEmployeeRateGetListRequest,
  accountEmployeeRateGetListSuccess,
  accountEmployeeRatePutError,
  accountEmployeeRatePutRequest,
  accountEmployeeRatePutSuccess,
} from '@account/store/actions';
import { layoutAlertAdd } from '@layout/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeRateGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.employeeUid}/rates?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeRateGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeRateGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeRateGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchListRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeRateGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.employeeUid}/rates/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeRateGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeRateGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeRateGetListError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchByIdRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeRateGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.employeeUid}/rates${action.payload.rateId}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeRateGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeRateGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeRateGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message,
        }))
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeRatePutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/account/employees/${action.payload.employeeUid}/rates`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(accountEmployeeRateGetByIdDispose()),
        put(accountEmployeeRateGetAllDispose()),
        put(accountEmployeeRatePutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(accountEmployeeRatePutError(response.statusText))
      ],
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
        put(accountEmployeeRatePutError(error.message)),
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

  yield takeEvery(Action.PUT_REQUEST, worker);
}

function* accountEmployeeRateSagas() {
  yield all([
    fork(watchAllRequest),
    fork(watchListRequest),
    fork(watchByIdRequest),
    fork(watchPutRequest),
  ]);
}

export default accountEmployeeRateSagas;