import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import {
  SummaryAction as Action,
  summaryGetBillableError,
  summaryGetBillableRequest,
  summaryGetBillableSuccess,
  summaryGetEffectivenessError,
  summaryGetEffectivenessRequest,
  summaryGetEffectivenessSuccess,
  summaryGetMappingError,
  summaryGetMappingRequest,
  summaryGetMappingSuccess,
  summaryGetProfitabilityError,
  summaryGetProfitabilityRequest,
  summaryGetProfitabilitySuccess,
  summaryGetProgressError,
  summaryGetProgressRequest,
  summaryGetProgressSuccess,
  summaryGetWinningError,
  summaryGetWinningRequest,
  summaryGetWinningSuccess,
} from '@summary/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchBillableFetchRequest() {
  const worker = (action: ReturnType<typeof summaryGetBillableRequest>) => { 
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/summary/billable/${action.payload.companyUid}?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(summaryGetBillableSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(summaryGetBillableError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(summaryGetBillableError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finallyEffects: [
        put(listBarLoading(false))
      ]
    });
  };
  
  yield takeEvery(Action.GET_BILLABLE_REQUEST, worker);
}

function* watchEffectivenessFetchRequest() {
  const worker = (action: ReturnType<typeof summaryGetEffectivenessRequest>) => { 
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/summary/effectiveness?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(summaryGetEffectivenessSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(summaryGetEffectivenessError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(summaryGetEffectivenessError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finallyEffects: [
        put(listBarLoading(false))
      ]
    });
  };
  
  yield takeEvery(Action.GET_EFFECTIVENESS_REQUEST, worker);
}

function* watchProfitabilityFetchRequest() {
  const worker = (action: ReturnType<typeof summaryGetProfitabilityRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/summary/profitability/${action.payload.customerUid}/${action.payload.projectUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(summaryGetProfitabilitySuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(summaryGetProfitabilityError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(summaryGetProfitabilityError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.GET_PROFITABILITY_REQUEST, worker);
}

function* watchProgressFetchRequest() {
  const worker = (action: ReturnType<typeof summaryGetProgressRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/summary/progress/${action.payload.customerUid}/${action.payload.projectUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(summaryGetProgressSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(summaryGetProgressError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(summaryGetProgressError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.GET_PROGRESS_REQUEST, worker);
}

function* watchWinningFetchRequest() {
  const worker = (action: ReturnType<typeof summaryGetWinningRequest>) => { 
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/summary/winning/${action.payload.companyUid}?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(summaryGetWinningSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(summaryGetWinningError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(summaryGetWinningError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finallyEffects: [
        put(listBarLoading(false))
      ]
    });
  };
  
  yield takeEvery(Action.GET_WINNING_REQUEST, worker);
}

function* watchMappingFetchRequest() {
  const worker = (action: ReturnType<typeof summaryGetMappingRequest>) => { 
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/summary/mapping/${action.payload.companyUid}/${action.payload.year}?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(summaryGetMappingSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(summaryGetMappingError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(summaryGetMappingError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finallyEffects: [
        put(listBarLoading(false))
      ]
    });
  };
  
  yield takeEvery(Action.GET_MAPPING_REQUEST, worker);
}

function* summarySagas() {
  yield all([
    fork(watchBillableFetchRequest),
    fork(watchEffectivenessFetchRequest),
    fork(watchProfitabilityFetchRequest),
    fork(watchProgressFetchRequest),
    fork(watchWinningFetchRequest),
    fork(watchMappingFetchRequest)
  ]);
}

export default summarySagas;