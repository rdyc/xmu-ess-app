import { IQuerySingleState } from '@generic/interfaces';
import { ISummaryGetProgressRequest } from '@summary/classes/queries';
import { ISummaryProgress } from '@summary/classes/response/progress';
import { SummaryAction as Action } from '@summary/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ISummaryGetProgressRequest, ISummaryProgress> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<ISummaryGetProgressRequest, ISummaryProgress>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_PROGRESS_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_PROGRESS_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_PROGRESS_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_PROGRESS_DISPOSE: return { ...state, isExpired: true };
    
    default: return state;
  }
};

export { reducer as summaryGetProgressReducer };