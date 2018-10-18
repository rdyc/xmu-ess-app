import { IExpenseRequestPostRequest } from '@expense/classes/queries/request';
import { IExpense } from '@expense/classes/response';
import { ExpenseRequestAction as Action } from '@expense/store/actions';
import { IQuerySingleState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IExpenseRequestPostRequest, IExpense> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IExpenseRequestPostRequest, IExpense>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as expenseRequestPostReducer };