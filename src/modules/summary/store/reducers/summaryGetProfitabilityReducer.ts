import { IQuerySingleState } from '@generic/interfaces';
import { ISummaryGetProfitabilityRequest } from '@summary/classes/queries';
import { ISummaryProfitability } from '@summary/classes/response/profitability';
import { SummaryAction as Action } from '@summary/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ISummaryGetProfitabilityRequest, ISummaryProfitability> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ISummaryGetProfitabilityRequest, ISummaryProfitability>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_PROFITABILITY_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_PROFITABILITY_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_PROFITABILITY_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_PROFITABILITY_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as summaryGetProfitabilityReducer };