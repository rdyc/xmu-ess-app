import { layoutAlertAdd } from '@layout/store/actions';
import {
  HolidayAction as Action,
  holidayGetAllError,
  holidayGetAllRequest,
  holidayGetAllSuccess,
  holidayGetByIdError,
  holidayGetByIdRequest,
  holidayGetByIdSuccess,
  holidayGetListError,
  holidayGetListRequest,
  holidayGetListSuccess,
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof holidayGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/holidays${objectToQuerystring(action.payload.filter)}`, 
      success: (response: IApiResponse) => ([
        put(holidayGetAllSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(holidayGetAllError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(holidayGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof holidayGetListRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/holidays/list${objectToQuerystring(action.payload.filter)}`,
      success: (response: IApiResponse) => ([
        put(holidayGetListSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(holidayGetListError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(holidayGetListError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof holidayGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/holidays/${action.payload.companyUid}/${action.payload.holidayUid}`,
      success: (response: IApiResponse) => ([
        put(holidayGetByIdSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(holidayGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(holidayGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message,
        }))
      ]),
      finally: () => ([])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* holidaySagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default holidaySagas;