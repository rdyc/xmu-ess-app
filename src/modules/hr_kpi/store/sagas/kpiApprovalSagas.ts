import { newHostAddress } from '@constants/newHostAddress';
import {
  KPIApprovalAction as Action,
  KPIApprovalGetAllDispose,
  KPIApprovalGetAllError,
  KPIApprovalGetAllRequest,
  KPIApprovalGetAllSuccess,
  KPIApprovalGetByIdDispose,
  KPIApprovalGetByIdError,
  KPIApprovalGetByIdRequest,
  KPIApprovalGetByIdSuccess,
  KPIApprovalPostError,
  KPIApprovalPostRequest,
  KPIApprovalPostSuccess,
} from '@kpi/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof KPIApprovalGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host: newHostAddress,
      method: 'get',
      path: `/v1/approval/kpi?${params}`,
      successEffects: (response: IApiResponse) => [
        put(KPIApprovalGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPIApprovalGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPIApprovalGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof KPIApprovalGetByIdRequest>) => {
    return saiyanSaga.fetch({
      host: newHostAddress,
      method: 'get',
      path: `/v1/approval/kpi/${action.payload.kpiUid}`,
      successEffects: (response: IApiResponse) => [
        put(KPIApprovalGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPIApprovalGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPIApprovalGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof KPIApprovalPostRequest>) => {
    return saiyanSaga.fetch({
      host: newHostAddress,
      method: 'post',
      path: `/v1/approval/kpi/${action.payload.kpiUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(KPIApprovalGetByIdDispose()),
        put(KPIApprovalGetAllDispose()),
        put(KPIApprovalPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(KPIApprovalPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(KPIApprovalPostError(error.message)),
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
      put(KPIApprovalGetAllDispose()),
      put(KPIApprovalGetByIdDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* kpiApprovalSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchSwitchAccess),
  ]);
}

export default kpiApprovalSagas;