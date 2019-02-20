import { layoutAlertAdd } from '@layout/store/actions';
import {
  PositionAction as Action,
  positionDeleteError,
  positionDeleteRequest,
  positionDeleteSuccess,
  positionGetAllDispose,
  positionGetAllError,
  positionGetAllRequest,
  positionGetAllSuccess,
  positionGetByIdDispose,
  positionGetByIdError,
  positionGetByIdRequest,
  positionGetByIdSuccess,
  positionGetListError,
  positionGetListRequest,
  positionGetListSuccess,
  positionPostError,
  positionPostRequest,
  positionPostSuccess,
  positionPutError,
  positionPutRequest,
  positionPutSuccess,
} from '@lookup/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof positionGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/positions?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(positionGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(positionGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(positionGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof positionGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/positions/list?${[params]}`,
      successEffects: (response: IApiResponse) => ([
        put(positionGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(positionGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(positionGetListError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof positionGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/positions/${action.payload.companyUid}/${action.payload.positionUid}`,
      successEffects: (response: IApiResponse) => ([
        put(positionGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(positionGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(positionGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message,
        }))
      ]),
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchFetchPostRequest() {
  const worker = (action: ReturnType<typeof positionPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/lookup/positions/${action.payload.companyUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => ([
        put(positionGetAllDispose()),
        put(positionGetByIdDispose()),
        put(positionPostSuccess(response.body))
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(positionPostError(response.statusText)),
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
        put(positionPostError(error.message)),
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
  const worker = (action: ReturnType<typeof positionPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/lookup/positions/${action.payload.companyUid}/${action.payload.positionUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => ([
        put(positionGetByIdDispose()),
        put(positionGetAllDispose()),
        put(positionPutSuccess(response.body)),
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(positionPutError(response.statusText)),
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
        put(positionPutError(error.message)),
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
  const worker = (action: ReturnType<typeof positionDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'delete',
      path: `/v1/lookup/positions/`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => ([
        put(positionGetAllDispose()),
        put(positionGetByIdDispose()),
        put(positionDeleteSuccess(response.body)),
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(positionDeleteError(response.statusText)),
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
        put(positionDeleteError(error.message)),
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

function* lookupPositionSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
    fork(watchFetchPostRequest),
    fork(watchFetchPutRequest),
    fork(watchFetchDeleteRequest),
  ]);
}

export default lookupPositionSagas;