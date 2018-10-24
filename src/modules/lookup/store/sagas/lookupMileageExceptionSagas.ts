import { layoutAlertAdd } from '@layout/store/actions';
import {
  LookupMileageExceptionAction as Action,
  lookupMileageExceptionGetAllError,
  lookupMileageExceptionGetAllRequest,
  lookupMileageExceptionGetAllSuccess,
  lookupMileageExceptionGetByIdError,
  lookupMileageExceptionGetByIdRequest,
  lookupMileageExceptionGetByIdSuccess,
  lookupMileageExceptionGetListError,
  lookupMileageExceptionGetListRequest,
  lookupMileageExceptionGetListSuccess,
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

// Get All
function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof lookupMileageExceptionGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/mileageexceptions${objectToQuerystring(action.payload.filter)}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupMileageExceptionGetAllSuccess(response.body))
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(lookupMileageExceptionGetAllError(response.statusText)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ]),
      errorEffects: (error: TypeError) => ([
        put(lookupMileageExceptionGetAllError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

// Get List
function* watchFetchListRequest() {
  const worker = (
    action: ReturnType<typeof lookupMileageExceptionGetListRequest>
  ) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/mileageexceptions/list${objectToQuerystring(action.payload.filter)}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupMileageExceptionGetListSuccess(response.body))
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(lookupMileageExceptionGetListError(response.statusText)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ]),
      errorEffects: (error: TypeError) => ([
        put(lookupMileageExceptionGetListError(error.message)),
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
function* watchFetchByIdRequest() {
  const worker = (
    action: ReturnType<typeof lookupMileageExceptionGetByIdRequest>
  ) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/mileageexceptions/${
        action.payload.mileageExceptionUid
      }`,
      successEffects: (response: IApiResponse) => ([
        put(lookupMileageExceptionGetByIdSuccess(response.body))
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(lookupMileageExceptionGetByIdError(response.statusText)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ]),
      errorEffects: (error: TypeError) => ([
        put(lookupMileageExceptionGetByIdError(error.message)),
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
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default lookupMileageExceptionSagas;
