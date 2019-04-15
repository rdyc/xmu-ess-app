import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd } from '@layout/store/actions';
import {
  LookupCurrencyAction as Action,
  lookupCurrencyDeleteError,
  lookupCurrencyDeleteRequest,
  lookupCurrencyDeleteSuccess,
  lookupCurrencyGetAllDispose,
  lookupCurrencyGetAllError,
  lookupCurrencyGetAllRequest,
  lookupCurrencyGetAllSuccess,
  lookupCurrencyGetByIdDispose,
  lookupCurrencyGetByIdError,
  lookupCurrencyGetByIdRequest,
  lookupCurrencyGetByIdSuccess,
  lookupCurrencyGetListError,
  lookupCurrencyGetListRequest,
  lookupCurrencyGetListSuccess,
  lookupCurrencyPostError,
  lookupCurrencyPostRequest,
  lookupCurrencyPostSuccess,
  lookupCurrencyPutError,
  lookupCurrencyPutRequest,
  lookupCurrencyPutSuccess,
} from '@lookup/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof lookupCurrencyGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/currencies?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(lookupCurrencyGetAllSuccess(response.body)), 
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupCurrencyGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupCurrencyGetAllError(error.message)),
      ]),
      finallyEffects: [
      ]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof lookupCurrencyGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/currencies/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupCurrencyGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupCurrencyGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupCurrencyGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof lookupCurrencyGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/currencies/${action.payload.currencyUid}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupCurrencyGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupCurrencyGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupCurrencyGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchFetchPostRequest() {
  const worker = (action: ReturnType<typeof lookupCurrencyPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/lookup/currencies`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => ([
        put(lookupCurrencyGetAllDispose()),
        put(lookupCurrencyPostSuccess(response.body))
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(lookupCurrencyPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupCurrencyPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchFetchPutRequest() {
  const worker = (action: ReturnType<typeof lookupCurrencyPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/lookup/currencies/${action.payload.currencyUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => ([
        put(lookupCurrencyGetAllDispose()),
        put(lookupCurrencyGetByIdDispose()),
        put(lookupCurrencyPutSuccess(response.body)),
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(lookupCurrencyPutError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupCurrencyPutError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.PUT_REQUEST, worker);
}

function* watchFetchDeleteRequest() {
  const worker = (action: ReturnType<typeof lookupCurrencyDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'delete',
      path: `/v1/lookup/currencies/`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => ([
        put(lookupCurrencyGetAllDispose()),
        put(lookupCurrencyGetByIdDispose()),
        put(lookupCurrencyDeleteSuccess(response.body)),
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(lookupCurrencyDeleteError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
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
        put(lookupCurrencyDeleteError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.DELETE_REQUEST, worker);
}

function* lookupCurrencySagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
    fork(watchFetchPostRequest),
    fork(watchFetchPutRequest),
    fork(watchFetchDeleteRequest),
  ]);
}

export default lookupCurrencySagas;