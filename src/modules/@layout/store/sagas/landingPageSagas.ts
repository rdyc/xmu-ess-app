import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';
import { LandingPageAction as Action, landingPageGetAllError, landingPageGetAllRequest, landingPageGetAllSuccess, layoutAlertAdd } from '../actions';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof landingPageGetAllRequest>) => {
    return saiyanSaga.fetch({
      host: window.self.location.origin,
      method: 'get',
      path: `/news.json`,
      successEffects: (response: IApiResponse) => [
        put(landingPageGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(landingPageGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ],
      errorEffects: (error: TypeError) => [
        put(landingPageGetAllError(error.message)),
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

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* landingPageSagas() {
  yield all([
    fork(watchAllFetchRequest),
  ]);
}

export default landingPageSagas;