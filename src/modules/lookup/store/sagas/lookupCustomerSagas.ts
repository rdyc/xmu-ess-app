import { layoutAlertAdd, listBarLoading } from '@layout/store/actions';
import {
  LookupCustomerAction as Action,
  lookupCustomerDeleteError,
  lookupCustomerDeleteRequest,
  lookupCustomerDeleteSuccess,
  lookupCustomerGetAllDispose,
  lookupCustomerGetAllError,
  lookupCustomerGetAllRequest,
  lookupCustomerGetAllSuccess,
  lookupCustomerGetByIdDispose,
  lookupCustomerGetByIdError,
  lookupCustomerGetByIdRequest,
  lookupCustomerGetByIdSuccess,
  lookupCustomerGetListError,
  lookupCustomerGetListRequest,
  lookupCustomerGetListSuccess,
  lookupCustomerPostError,
  lookupCustomerPostRequest,
  lookupCustomerPostSuccess,
  lookupCustomerPutError,
  lookupCustomerPutRequest,
  lookupCustomerPutSuccess,
} from '@lookup/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof lookupCustomerGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/customers?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(lookupCustomerGetAllSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupCustomerGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupCustomerGetAllError(error.message)),
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

function* watchGetListRequest() {
  const worker = (action: ReturnType<typeof lookupCustomerGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/customers/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupCustomerGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupCustomerGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupCustomerGetListError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof lookupCustomerGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/customers/${action.payload.companyUid}/${action.payload.customerUid}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupCustomerGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupCustomerGetByIdError(response)),

      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupCustomerGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message,
        }))
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof lookupCustomerPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/lookup/customers/${action.payload.companyUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupCustomerPostSuccess(response.body)),
        put(lookupCustomerGetAllDispose())
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupCustomerPostError(response.statusText))
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
        put(lookupCustomerPostError(error.message)),
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
  const worker = (action: ReturnType<typeof lookupCustomerPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/lookup/customers/${action.payload.companyUid}/${action.payload.customerUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupCustomerPutSuccess(response.body)),
        put(lookupCustomerGetByIdDispose()),
        put(lookupCustomerGetAllDispose())
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupCustomerPutError(response.statusText))
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
        put(lookupCustomerPutError(error.message)),
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
  const worker = (action: ReturnType<typeof lookupCustomerDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'delete',
      path: `/v1/lookup/customers`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupCustomerDeleteSuccess(response.body)),
        put(lookupCustomerGetAllDispose()),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupCustomerDeleteError(response.statusText))
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
        put(lookupCustomerDeleteError(error.message)),
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

function* lookupCustomerSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetListRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest)
  ]);
}

export default lookupCustomerSagas;