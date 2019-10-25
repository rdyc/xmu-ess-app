import { IQueryCollectionState } from '@generic/interfaces';
import { IWebJobMonitoringJobEnqueuedGetAllRequest } from '@webjob/classes/queries';
import { IWebJobMonitoringJobEnqueued } from '@webjob/classes/response';
import { WebJobMonitoringAction as Action } from '@webjob/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IWebJobMonitoringJobEnqueuedGetAllRequest, IWebJobMonitoringJobEnqueued> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IWebJobMonitoringJobEnqueuedGetAllRequest, IWebJobMonitoringJobEnqueued>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.JOB_ENQUEUED_GET_ALL_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.JOB_ENQUEUED_GET_ALL_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.JOB_ENQUEUED_GET_ALL_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.JOB_ENQUEUED_GET_ALL_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as webJobMonitoringJobEnqueuedGetAllReducer };