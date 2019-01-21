import { layoutAlertAdd } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

import {
  AnnouncementAction as Action,
  announcementGetError,
  announcementGetRequest,
  announcementGetSuccess,
} from '../actions/announcementActions';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof announcementGetRequest>) => {
    return saiyanSaga.fetch({
      host: window.self.location.origin,
      method: 'get',
      path: `/data/images.json`,
      successEffects: (response: IApiResponse) => [
        put(announcementGetSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(announcementGetError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ],
      errorEffects: (error: TypeError) => [
        put(announcementGetError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          }))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_REQUEST, worker);
}

function* announcementSagas() {
  yield all([
    fork(watchAllFetchRequest),
  ]);
}

export default announcementSagas;