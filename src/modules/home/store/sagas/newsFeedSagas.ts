import {
  NewsFeedAction as Action,
  newsFeedGetError,
  newsFeedGetRequest,
  newsFeedGetSuccess,
} from '@home/store/actions';
import { layoutAlertAdd } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof newsFeedGetRequest>) => {
    return saiyanSaga.fetch({
      host: window.self.location.origin,
      method: 'get',
      path: `/news.json`,
      successEffects: (response: IApiResponse) => [
        put(newsFeedGetSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(newsFeedGetError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ],
      errorEffects: (error: TypeError) => [
        put(newsFeedGetError(error.message)),
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

function* newsFeedSagas() {
  yield all([
    fork(watchAllFetchRequest),
  ]);
}

export default newsFeedSagas;