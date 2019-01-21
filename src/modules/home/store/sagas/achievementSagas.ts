import { layoutAlertAdd } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';
import { AchievementAction as Action, achievementGetError, achievementGetRequest, achievementGetSuccess } from '../actions/achievementActions';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof achievementGetRequest>) => {
    return saiyanSaga.fetch({
      host: window.self.location.origin,
      method: 'get',
      path: `/chart.json`,
      successEffects: (response: IApiResponse) => [
        put(achievementGetSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(achievementGetError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ],
      errorEffects: (error: TypeError) => [
        put(achievementGetError(error.message)),
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

function* achievementSagas() {
  yield all([
    fork(watchAllFetchRequest),
  ]);
}

export default achievementSagas;