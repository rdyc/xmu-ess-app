import { IFinanceBulkPostRequest } from '@finance/classes/queries';
import { IFinance } from '@finance/classes/response';
import { FinanceAction as Action } from '@finance/store/actions';
import { IQuerySingleState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IFinanceBulkPostRequest, IFinance> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IFinanceBulkPostRequest, IFinance>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.BULK_POST_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.BULK_POST_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.BULK_POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.BULK_POST_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as financeBulkPostReducer };