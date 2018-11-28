import { layoutAlertAdd } from '@layout/store/actions';
import {
  TravelAction as Action,
  travelGetAllDispose,
  travelGetAllError,
  travelGetAllRequest,
  travelGetAllSuccess,
  travelGetByIdDispose,
  travelGetByIdError,
  travelGetByIdRequest,
  travelGetByIdSuccess,
  travelPostError,
  travelPostRequest,
  travelPostSuccess,
  travelPutError,
  travelPutRequest,
  travelPutSuccess,
} from '@travel/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof travelGetAllRequest>) => { 
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/travel/requests${objectToQuerystring(action.payload.filter)}`, 
      successEffects: (response: IApiResponse) => ([
        put(travelGetAllSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(travelGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(travelGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finallyEffects: [
        // nothing
      ]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchByIdFetchRequest() {
  const worker = (action: ReturnType<typeof travelGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/travel/requests/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.travelUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(travelGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(travelGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(travelGetByIdError(error.message)),
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
  const worker = (action: ReturnType<typeof travelPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/travel/requests/${action.payload.companyUid}/${action.payload.positionUid}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(travelPostSuccess(response.body)),
        put(travelGetAllDispose())
      ], 
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(travelPostError(response.statusText)),
      ], 
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
      errorEffects: (error: TypeError) => [
        put(travelPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchPutFetchRequest() {
  const worker = (action: ReturnType<typeof travelPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/travel/requests/${action.payload.companyUid}/${
        action.payload.positionUid
      }/${action.payload.travelUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(travelPutSuccess(response.body)),
        put(travelGetAllDispose()),
        put(travelGetByIdDispose())
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(travelPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        if (response.status === 400) {
          const errors: any = { 
            // information -> based on form section name
            information: flattenObject(response.body.errors) 
          };
          
          // action.payload.reject(new SubmissionError(response.body.errors));
          action.payload.reject(new SubmissionError(errors));
        } else {
          action.payload.reject(response.statusText);
        }
      },
      errorEffects: (error: TypeError) => [
        put(travelPutError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.PUT_REQUEST, worker);
}

function* travelSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostFetchRequest),
    fork(watchPutFetchRequest)
  ]);
}

export default travelSagas;