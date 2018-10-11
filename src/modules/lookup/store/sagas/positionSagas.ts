import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import {
  PositionAction as Action,
  positionGetAllError,
  positionGetAllRequest,
  positionGetAllSuccess,
  positionGetByIdError,
  positionGetByIdRequest,
  positionGetByIdSuccess,
  positionGetListError,
  positionGetListRequest,
  positionGetListSuccess,
  positionPostError,
  positionPostRequest,
  positionPostSuccess,
  positionPutError,
  positionPutRequest,
  positionPutSuccess
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

const flattenObject = (ob: any) => {
  const toReturn = {};

  for (const i in ob) {
    if (!ob.hasOwnProperty(i)) { continue; }
    
    if ((typeof ob[i]) === 'object') {
      const flatObject = flattenObject(ob[i]);
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) { continue; }
        
        toReturn[`${i}`] = flatObject[i] ? `${flatObject[i]}, ${flatObject[x]}` : flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof positionGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/positions${objectToQuerystring(action.payload.filter)}`, 
      successEffects: (response: IApiResponse) => ([
        put(positionGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(positionGetAllError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(positionGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finallyEffects: [put(listBarLoading(false))]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof positionGetListRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/positions/list${objectToQuerystring(action.payload.filter)}`,
      successEffects: (response: IApiResponse) => ([
        put(positionGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(positionGetListError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(positionGetListError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof positionGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/positions/${action.payload.companyUid}/${action.payload.positionUid}`,
      successEffects: (response: IApiResponse) => ([
        put(positionGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(positionGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(positionGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message,
        }))
      ]),
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostFetchRequest() {
  const worker = (action: ReturnType<typeof positionPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/lookup/positions/${action.payload.companyUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(positionPostSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(positionPostError(response.statusText)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ],
      errorEffects: (error: TypeError) => [
        put(positionPostError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ]
    });
  };

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchPutFetchRequest() {
  const worker = (action: ReturnType<typeof positionPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/lookup/positions/${action.payload.companyUid}
        /${action.payload.positionUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(positionPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve();
      },
      failureEffects: (response: IApiResponse) => [
        put(positionPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        if (response.status === 400) {
          const errors = flattenObject(response.body.errors);
          
          // action.payload.reject(new SubmissionError(response.body.errors));
          action.payload.reject(new SubmissionError(errors));
        } else {
          action.payload.reject(response.statusText);
        }
      },
      errorEffects: (error: TypeError) => [
        put(positionPostError(error.message)),
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

function* positionSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
    fork(watchPostFetchRequest),
    fork(watchPutFetchRequest)
  ]);
}

export default positionSagas;