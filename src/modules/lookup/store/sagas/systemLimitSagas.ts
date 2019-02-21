import { layoutAlertAdd } from '@layout/store/actions';
import {
  SystemLimitAction as Action,
  systemLimitDeleteError,
  systemLimitDeleteRequest,
  systemLimitDeleteSuccess,
  systemLimitGetAllDispose,
  systemLimitGetAllError,
  systemLimitGetAllRequest,
  systemLimitGetAllSuccess,
  systemLimitGetAmountError,
  systemLimitGetAmountRequest,
  systemLimitGetAmountSuccess,
  systemLimitGetByIdDispose,
  systemLimitGetByIdError,
  systemLimitGetByIdRequest,
  systemLimitGetByIdSuccess,
  systemLimitGetListError,
  systemLimitGetListRequest,
  systemLimitGetListSuccess,
  systemLimitPostError,
  systemLimitPostRequest,
  systemLimitPostSuccess,
  systemLimitPutError,
  systemLimitPutRequest,
  systemLimitPutSuccess,
} from '@lookup/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof systemLimitGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/systemlimits?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(systemLimitGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(systemLimitGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(systemLimitGetAllError(error.message)),
      ]),
      finallyEffects: [
        // nothing
      ]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetAmountRequest() {
  const worker = (action: ReturnType<typeof systemLimitGetAmountRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/systemlimits/limit/${action.payload.companyUid}/${action.payload.categoryType}`, 
      successEffects: (response: IApiResponse) => ([
        put(systemLimitGetAmountSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(systemLimitGetAmountError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(systemLimitGetAmountError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_AMOUNT_REQUEST, worker);
}

function* watchGetListRequest() {
  const worker = (action: ReturnType<typeof systemLimitGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/systemlimits/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(systemLimitGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(systemLimitGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(systemLimitGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof systemLimitGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/systemlimits/${action.payload.companyUid}/${action.payload.systemLimitUid}`,
      successEffects: (response: IApiResponse) => ([
        put(systemLimitGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(systemLimitGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(systemLimitGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof systemLimitPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/lookup/systemlimits/${action.payload.companyUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(systemLimitGetByIdDispose()),
        put(systemLimitGetAllDispose()),
        put(systemLimitPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(systemLimitPostError(response.statusText))
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
        put(systemLimitPostError(error.message)),
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
  const worker = (action: ReturnType<typeof systemLimitPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/lookup/systemlimits/${action.payload.companyUid}/${action.payload.systemLimitUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(systemLimitGetByIdDispose()),
        put(systemLimitGetAllDispose()),
        put(systemLimitPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(systemLimitPutError(response.statusText))
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
        put(systemLimitPutError(error.message)),
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
  const worker = (action: ReturnType<typeof systemLimitDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'delete',
      path: `/v1/lookup/systemlimits`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(systemLimitGetAllDispose()),
        put(systemLimitDeleteSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(systemLimitDeleteError(response.statusText))
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
        put(systemLimitDeleteError(error.message)),
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

function* lookupSystemLimitSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetAmountRequest),
    fork(watchGetListRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest)
  ]);
}

export default lookupSystemLimitSagas;