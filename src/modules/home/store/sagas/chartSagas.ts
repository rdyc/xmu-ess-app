import { layoutAlertAdd } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';
import { ChartAction as Action, chartGetAllError, chartGetAllRequest, chartGetAllSuccess } from '../actions/chartActions';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof chartGetAllRequest>) => {
    return saiyanSaga.fetch({
      host: window.self.location.host,
      method: 'get',
      path: `chart.json`,
      successEffects: (response: IApiResponse) => [
        put(chartGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(chartGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ],
      errorEffects: (error: TypeError) => [
        put(chartGetAllError(error.message)),
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

function* chartSagas() {
  yield all([
    fork(watchAllFetchRequest),
  ]);
}

export default chartSagas;