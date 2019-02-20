import { layoutAlertAdd } from '@layout/store/actions';
import {
  LookupHolidayAction as Action,
  lookupHolidayDeleteError,
  lookupHolidayDeleteRequest,
  lookupHolidayDeleteSuccess,
  lookupHolidayGetAllDispose,
  lookupHolidayGetAllError,
  lookupHolidayGetAllRequest,
  lookupHolidayGetAllSuccess,
  lookupHolidayGetByIdError,
  lookupHolidayGetByIdRequest,
  lookupHolidayGetByIdSuccess,
  lookupHolidayGetListError,
  lookupHolidayGetListRequest,
  lookupHolidayGetListSuccess,
  lookupHolidayPostError,
  lookupHolidayPostRequest,
  lookupHolidayPostSuccess,
  lookupHolidayPutError,
  lookupHolidayPutRequest,
  lookupHolidayPutSuccess,
} from '@lookup/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof lookupHolidayGetAllRequest>) => { 
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/holidays?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(lookupHolidayGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupHolidayGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupHolidayGetAllError(error.message)),
      ]),
      finallyEffects: [
        // put(listBarLoading(false))
      ]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof lookupHolidayGetListRequest>) => { 
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/holidays/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupHolidayGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupHolidayGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupHolidayGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof lookupHolidayGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/holidays/${action.payload.companyUid}/${action.payload.holidayUid}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupHolidayGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupHolidayGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupHolidayGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof lookupHolidayPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/lookup/holidays/${action.payload.companyUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupHolidayGetAllDispose()),
        put(lookupHolidayPostSuccess(response.body)),
        put(lookupHolidayGetByIdSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupHolidayPostError(response.statusText))
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
        put(lookupHolidayPostError(error.message)),
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

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof lookupHolidayPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/lookup/holidays/${action.payload.companyUid}/${action.payload.holidayUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupHolidayPutSuccess(response.body)),
        put(lookupHolidayGetAllDispose()),
        put(lookupHolidayGetByIdSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupHolidayPutError(response.statusText))
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
        put(lookupHolidayPutError(error.message)),
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

function* watchDeleteRequest() {
  const worker = (action: ReturnType<typeof lookupHolidayDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'delete',
      path: `/v1/lookup/holidays`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupHolidayGetAllDispose()),
        put(lookupHolidayDeleteSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupHolidayDeleteError(response.statusText))
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
        put(lookupHolidayDeleteError(error.message)),
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

  yield takeEvery(Action.DELETE_REQUEST, worker);
}

function* lookupHolidaySagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest)
  ]);
}

export default lookupHolidaySagas;