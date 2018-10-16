import { IFinancePostRequest } from '@finance/classes/queries';
import { IFinance } from '@finance/classes/response';
import { FinanceAction as Action } from '@finance/store/actions';
import { IQuerySingleState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IFinancePostRequest, IFinance> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IFinancePostRequest, IFinance>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as financePostReducer };