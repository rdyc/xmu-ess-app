import { layoutAlertAdd } from '@layout/store/actions';
import {
  MileageApprovalAction as Action,
  mileageApprovalGetAllDispose,
  mileageApprovalGetAllError,
  mileageApprovalGetAllRequest,
  mileageApprovalGetAllSuccess,
  mileageApprovalGetByIdDispose,
  mileageApprovalGetByIdError,
  mileageApprovalGetByIdRequest,
  mileageApprovalGetByIdSuccess,
  mileageApprovalPostError,
  mileageApprovalPostRequest,
  mileageApprovalPostSuccess,
} from '@mileage/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof mileageApprovalGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/mileage${objectToQuerystring(action.payload.filter)}`, 
      successEffects: (response: IApiResponse) => ([
        put(mileageApprovalGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(mileageApprovalGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(mileageApprovalGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finallyEffects: [
        // put(listBarLoading(false))
      ]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchByIdFetchRequest() {
  const worker = (action: ReturnType<typeof mileageApprovalGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/mileage/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.mileageUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(mileageApprovalGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(mileageApprovalGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(mileageApprovalGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostFetchRequest() {
  const worker = (action: ReturnType<typeof mileageApprovalPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/approvals/mileage/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.mileageUid}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => ([
        put(mileageApprovalGetAllDispose()),
        put(mileageApprovalGetByIdDispose()),
        put(mileageApprovalPostSuccess(response.body))
      ]), 
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(mileageApprovalPostError(response.statusText)),
      ]),
      failureCallback: (response: IApiResponse) => {
        if (response.status === 400) {
          const errors: any = { 
            // information -> based form section name
            information: flattenObject(response.body.errors) 
          };

          action.payload.reject(new SubmissionError(errors));
        } else {
          action.payload.reject(response.statusText);
        }
      },
      errorEffects: (error: TypeError) => ([
        put(mileageApprovalPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* mileageApprovalSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostFetchRequest)
  ]);
}

export default mileageApprovalSagas;