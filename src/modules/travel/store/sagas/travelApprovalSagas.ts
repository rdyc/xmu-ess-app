import { layoutAlertAdd } from '@layout/store/actions';
import {
  TravelApprovalAction as Action,
  travelApprovalGetAllDispose,
  travelApprovalGetAllError,
  travelApprovalGetAllRequest,
  travelApprovalGetAllSuccess,
  travelApprovalGetByIdError,
  travelApprovalGetByIdRequest,
  travelApprovalGetByIdSuccess,
  travelApprovalPostError,
  travelApprovalPostRequest,
  travelApprovalPostSuccess,
} from '@travel/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof travelApprovalGetAllRequest>) => { 
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/travel?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(travelApprovalGetAllSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(travelApprovalGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(travelApprovalGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finallyEffects: [
        // nothing
      ]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchByIdFetchRequest() {
  const worker = (action: ReturnType<typeof travelApprovalGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/travel/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.travelUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(travelApprovalGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(travelApprovalGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(travelApprovalGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostFetchRequest() {
  const worker = (action: ReturnType<typeof travelApprovalPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/approvals/travel/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.travelUid}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(travelApprovalPostSuccess(response.body)),
        put(travelApprovalGetAllDispose())
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      }, 
      failureEffects: (response: IApiResponse) => [
        put(travelApprovalPostError(response.statusText)),
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
        put(travelApprovalPostError(error.message)),
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

function* travelApprovalSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostFetchRequest)
  ]);
}

export default travelApprovalSagas;