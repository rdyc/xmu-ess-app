import {
  NewsFeedAction as Action,
  newsFeedGetError,
  newsFeedGetListError,
  newsFeedGetListRequest,
  newsFeedGetListSuccess,
  newsFeedGetRequest,
  newsFeedGetSuccess,
} from '@home/store/actions';
import { layoutAlertAdd } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof newsFeedGetRequest>) => {
    return saiyanSaga.fetch({
      host: window.self.location.origin,
      method: 'GET',
      path: ``,
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

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof newsFeedGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/news/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(newsFeedGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(newsFeedGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(newsFeedGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* newsFeedSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchFetchListRequest)
  ]);
}

export default newsFeedSagas;