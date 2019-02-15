import { NotificationAction as Action } from '@layout/types';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

import { notificationFetchError, notificationFetchRequest, notificationFetchSuccess } from '../actions';

function* watchFetchRequest() {
  const worker = (action: ReturnType<typeof notificationFetchRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/notifications?companyUid=${action.payload.companyUid}&positionUid=${action.payload.positionUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(notificationFetchSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(notificationFetchError(response))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(notificationFetchError(error.message))
      ])
    });
  };

  yield takeEvery(Action.FETCH_REQUEST, worker);
}

function* commonNotificationSagas() {
  yield all([fork(watchFetchRequest)]);
}

export default commonNotificationSagas;