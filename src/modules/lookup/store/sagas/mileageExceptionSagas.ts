import { layoutAlertAdd } from '@layout/store/actions';
import {
  MileageExceptionAction as Action,
  mileageExceptionGetAllError,
  mileageExceptionGetAllRequest,
  mileageExceptionGetAllSuccess,
  mileageExceptionGetByIdError,
  mileageExceptionGetByIdRequest,
  mileageExceptionGetByIdSuccess,
  mileageExceptionGetListError,
  mileageExceptionGetListRequest,
  mileageExceptionGetListSuccess,
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

// Get All
function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof mileageExceptionGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/mileageexceptions${objectToQuerystring(
        action.payload.filter
      )}`,
      success: (response: IApiResponse) => ([
        put(mileageExceptionGetAllSuccess(response.body))
      ]),
      failed: (response: IApiResponse) => ([
        put(mileageExceptionGetAllError(response.statusText)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ]),
      error: (error: TypeError) => ([
        put(mileageExceptionGetAllError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ]),
      finally: () => ([])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

// Get List
function* watchFetchListRequest() {
  const worker = (
    action: ReturnType<typeof mileageExceptionGetListRequest>
  ) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/mileageexceptions/list${objectToQuerystring(
        action.payload.filter
      )}`,
      success: (response: IApiResponse) => ([
        put(mileageExceptionGetListSuccess(response.body))
      ]),
      failed: (response: IApiResponse) => ([
        put(mileageExceptionGetListError(response.statusText)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ]),
      error: (error: TypeError) => ([
        put(mileageExceptionGetListError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ]),
      finally: () => ([])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

// Get By ID
function* watchFetchByIdRequest() {
  const worker = (
    action: ReturnType<typeof mileageExceptionGetByIdRequest>
  ) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/mileageexceptions/${
        action.payload.mileageExceptionUid
      }`,
      success: (response: IApiResponse) => ([
        put(mileageExceptionGetByIdSuccess(response.body))
      ]),
      failed: (response: IApiResponse) => ([
        put(mileageExceptionGetByIdError(response.statusText)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ]),
      error: (error: TypeError) => ([
        put(mileageExceptionGetByIdError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ]),
      finally: () => ([])
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* mileageExceptionSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default mileageExceptionSagas;
