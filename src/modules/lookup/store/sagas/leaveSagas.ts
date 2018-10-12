import { layoutAlertAdd,  listBarMetadata } from '@layout/store/actions';
import {
  LeaveAction as Action,
  leaveGetAllError,
  leaveGetAllRequest,
  leaveGetAllSuccess,
  leaveGetByIdError,
  leaveGetByIdRequest,
  leaveGetByIdSuccess,
  leaveGetListError,
  leaveGetListRequest,
  leaveGetListSuccess,
  // leavePutError,
  // leavePutRequest,
  // leavePutSuccess,
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
// import { SubmissionError } from 'redux-form';
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
  const worker = (action: ReturnType<typeof leaveGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/leaves${objectToQuerystring(
        action.payload.filter)}`, 
      success: (response: IApiResponse) => [
        put(leaveGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ], 
      failed: (response: IApiResponse) => [
        put(leaveGetAllError(response.body)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
        }))
      ], 
      error: (error: TypeError) => [
        put(leaveGetAllError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ],
      finally: () => ([])
    });
  };
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof leaveGetListRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/leaves/list${objectToQuerystring(
        action.payload.filter)}`,
      success: (response: IApiResponse) => [
        put(leaveGetListSuccess(response.body)),
      ], 
      failed: (response: IApiResponse) => [
        put(leaveGetListError(response.statusText)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
         })
        )
      ], 
      error: (error: TypeError) => [
        put(leaveGetListError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ],
      finally: () => ([])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof leaveGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/leaves/${action.payload.companyUid}/${action.payload.leaveUid}`,
      success: (response: IApiResponse) => [
        put(leaveGetByIdSuccess(response.body)),
      ], 
      failed: (response: IApiResponse) => [
        put(leaveGetByIdError(response.statusText)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ], 
      error: (error: TypeError) => [
        put(leaveGetByIdError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message,
          })
        )
      ],
      finally: () => ([])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

// function* watchPutFetchRequest() {
//   const worker = (action: ReturnType<typeof leavePutRequest>) => {
//     return saiyanSaga.fetch({
//       method: 'put',
//       path: `/v1/lookup/leaves/${action.payload.companyUid}
//       }/${action.payload.leaveUid}`,
//       payload: action.payload.data,
//       successEffects: (response: IApiResponse) => [
//         put(leavePutSuccess(response.body))
//       ],
//       successCallback: (response: IApiResponse) => {
//         action.payload.resolve();
//       },
//       failureEffects: (response: IApiResponse) => [
//         put(leavePutError(response.statusText))
//       ],
//       failureCallback: (response: IApiResponse) => {
//         if (response.status === 400) {
//           const errors = flattenObject(response.body.errors);
          
//           // action.payload.reject(new SubmissionError(response.body.errors));
//           action.payload.reject(new SubmissionError(errors));
//         } else {
//           action.payload.reject(response.statusText);
//         }
//       },
//       errorEffects: (error: TypeError) => [
//         put(leavePutError(error.message)),
//         put(
//           layoutAlertAdd({
//             time: new Date(),
//             message: error.message
//           })
//         )
//       ],
//       errorCallback: (error: any) => {
//         action.payload.reject(error);
//       }
//     });
//   };

//   yield takeEvery(Action.PUT_REQUEST, worker);
// }

function* leaveSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
    // fork(watchPutFetchRequest)
  ]);
}

export default leaveSagas;