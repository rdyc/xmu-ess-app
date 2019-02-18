import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import {
  LeaveApprovalAction as Action,
  leaveApprovalGetAllDispose,
  leaveApprovalGetAllError,
  leaveApprovalGetAllRequest,
  leaveApprovalGetAllSuccess,
  leaveApprovalGetByIdDispose,
  leaveApprovalGetByIdError,
  leaveApprovalGetByIdRequest,
  leaveApprovalGetByIdSuccess,
  leaveApprovalPostError,
  leaveApprovalPostRequest,
  leaveApprovalPostSuccess,
} from '@leave/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof leaveApprovalGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/leave?${params}`,
      successEffects: (response: IApiResponse) => [
        put(leaveApprovalGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(leaveApprovalGetAllError(response.body)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ],
      errorEffects: (error: TypeError) => [
        put(leaveApprovalGetAllError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof leaveApprovalGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/leave/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.leaveUid}`,
      successEffects: (response: IApiResponse) => [
        put(leaveApprovalGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(leaveApprovalGetByIdError(response.statusText)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ],
      errorEffects: (error: TypeError) => [
        put(leaveApprovalGetByIdError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof leaveApprovalPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/approvals/leave/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.leaveUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(leaveApprovalGetAllDispose()),
        put(leaveApprovalGetByIdDispose()),
        put(leaveApprovalPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(leaveApprovalPostError(response.statusText))
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
        put(leaveApprovalPostError(error.message)),
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

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(leaveApprovalGetAllDispose()),
      put(leaveApprovalGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* leaveApprovalSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchSwitchAccess)
  ]);
}

export default leaveApprovalSagas;