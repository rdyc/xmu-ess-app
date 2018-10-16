import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import {
  MileageApprovalAction as Action,
  mileageapprovalGetAllError,
  mileageapprovalGetAllRequest,
  mileageapprovalGetAllSuccess,
  mileageapprovalGetByIdError,
  mileageapprovalGetByIdRequest,
  mileageapprovalGetByIdSuccess,
  mileageapprovalPostError,
  mileageapprovalPostRequest,
  mileageapprovalPostSuccess
} from '@mileage/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof mileageapprovalGetAllRequest>) => { 
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/mileage${objectToQuerystring(action.payload.filter)}`, 
      success: (response: IApiResponse) => ([
        put(mileageapprovalGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failed: (response: IApiResponse) => ([
        put(mileageapprovalGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(mileageapprovalGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        put(listBarLoading(false))
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchByIdFetchRequest() {
  const worker = (action: ReturnType<typeof mileageapprovalGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/mileage/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.mileageUid}`, 
      success: (response: IApiResponse) => ([
        put(mileageapprovalGetByIdSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(mileageapprovalGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(mileageapprovalGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        // nothing
      ])
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostFetchRequest() {
  const worker = (action: ReturnType<typeof mileageapprovalPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/approvals/mileage/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.mileageUid}`, 
      payload: action.payload.data, 
      success: (response: IApiResponse) => ([
        put(mileageapprovalPostSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(mileageapprovalPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(mileageapprovalPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        // nothing
      ])
    });
  };

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* mileageapprovalSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostFetchRequest)
  ]);
}

export default mileageapprovalSagas;