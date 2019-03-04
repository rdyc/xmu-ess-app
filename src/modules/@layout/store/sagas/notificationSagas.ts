import { NotificationAction as Action } from '@layout/types';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

import {
  notificationGetAllDispose,
  notificationGetAllError,
  notificationGetAllRequest,
  notificationGetAllSuccess,
  UserAction,
} from '../actions';

function* watchFetchRequest() {
  const worker = (action: ReturnType<typeof notificationGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/notifications?companyUid=${action.payload.companyUid}&positionUid=${action.payload.positionUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(notificationGetAllSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(notificationGetAllError(response))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(notificationGetAllError(error.message))
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(notificationGetAllDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* commonNotificationSagas() {
  yield all([
    fork(watchFetchRequest),
    fork(watchSwitchAccess)
  ]);
}

export default commonNotificationSagas;