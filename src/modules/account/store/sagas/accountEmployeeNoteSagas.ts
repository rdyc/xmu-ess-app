import {
  AccountEmployeeNoteAction as Action,
  accountEmployeeNoteDeleteError,
  accountEmployeeNoteDeleteRequest,
  accountEmployeeNoteDeleteSuccess,
  accountEmployeeNoteGetAllDispose,
  accountEmployeeNoteGetAllError,
  accountEmployeeNoteGetAllRequest,
  accountEmployeeNoteGetAllSuccess,
  accountEmployeeNoteGetByIdDispose,
  accountEmployeeNoteGetByIdError,
  accountEmployeeNoteGetByIdRequest,
  accountEmployeeNoteGetByIdSuccess,
  accountEmployeeNoteGetListError,
  accountEmployeeNoteGetListRequest,
  accountEmployeeNoteGetListSuccess,
  accountEmployeeNotePostError,
  accountEmployeeNotePostRequest,
  accountEmployeeNotePostSuccess,
  accountEmployeeNotePutError,
  accountEmployeeNotePutRequest,
  accountEmployeeNotePutSuccess,
} from '@account/store/actions';
import { layoutAlertAdd } from '@layout/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeNoteGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.employeeUid}/notes?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeNoteGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeNoteGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeNoteGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchListRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeNoteGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.employeeUid}/notes/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeNoteGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeNoteGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeNoteGetListError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchByIdRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeNoteGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.employeeUid}/notes${action.payload.noteId}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeNoteGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeNoteGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeNoteGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message,
        }))
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeNotePostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/account/employees/${action.payload.employeeUid}/notes`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(accountEmployeeNoteGetByIdDispose()),
        put(accountEmployeeNoteGetAllDispose()),
        put(accountEmployeeNotePostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(accountEmployeeNotePostError(response.statusText))
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
        put(accountEmployeeNotePostError(error.message)),
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

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeNotePutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/account/employees/${action.payload.employeeUid}/notes`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(accountEmployeeNoteGetByIdDispose()),
        put(accountEmployeeNoteGetAllDispose()),
        put(accountEmployeeNotePutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(accountEmployeeNotePutError(response.statusText))
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
        put(accountEmployeeNotePutError(error.message)),
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

function* watchDeleteRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeNoteDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'delete',
      path: `/v1/account/employees/${action.payload.employeeUid}/notes`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(accountEmployeeNoteGetAllDispose()),
        put(accountEmployeeNoteDeleteSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(accountEmployeeNoteDeleteError(response.statusText))
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
        put(accountEmployeeNoteDeleteError(error.message)),
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

  yield takeEvery(Action.DELETE_REQUEST, worker);
}

function* accountEmployeeNoteSagas() {
  yield all([
    fork(watchAllRequest),
    fork(watchListRequest),
    fork(watchByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest)
  ]);
}

export default accountEmployeeNoteSagas;