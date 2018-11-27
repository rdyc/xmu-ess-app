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
function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof mileageExceptionGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/mileageexceptions${objectToQuerystring(action.payload.filter)}`,
      successEffects: (response: IApiResponse) => ([
        put(mileageExceptionGetAllSuccess(response.body))
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(mileageExceptionGetAllError(response.body)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ]),
      errorEffects: (error: TypeError) => ([
        put(mileageExceptionGetAllError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ]),
      finallyEffects: [
        // put(listBarLoading(false))
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

// Get List
function* watchGetListRequest() {
  const worker = (
    action: ReturnType<typeof mileageExceptionGetListRequest>
  ) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/mileageexceptions/list${objectToQuerystring(action.payload.filter)}`,
      successEffects: (response: IApiResponse) => ([
        put(mileageExceptionGetListSuccess(response.body))
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(mileageExceptionGetListError(response.body)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ]),
      errorEffects: (error: TypeError) => ([
        put(mileageExceptionGetListError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

// Get By ID
function* watchGetByIdRequest() {
  const worker = (
    action: ReturnType<typeof mileageExceptionGetByIdRequest>
  ) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/mileageexceptions/${
        action.payload.mileageExceptionUid
      }`,
      successEffects: (response: IApiResponse) => ([
        put(mileageExceptionGetByIdSuccess(response.body))
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(mileageExceptionGetByIdError(response.body)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ]),
      errorEffects: (error: TypeError) => ([
        put(mileageExceptionGetByIdError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ])
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* lookupMileageExceptionSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetListRequest),
    fork(watchGetByIdRequest),
  ]);
}

export default lookupMileageExceptionSagas;
