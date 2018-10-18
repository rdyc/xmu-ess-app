import { IExpenseApprovalPostRequest } from '@expense/classes/queries/approval';
import { IExpense } from '@expense/classes/response';
import { ExpenseApprovalAction as Action } from '@expense/store/actions';
import { IQuerySingleState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IExpenseApprovalPostRequest, IExpense> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IExpenseApprovalPostRequest, IExpense>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.APPROVAL_POST_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.APPROVAL_POST_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.APPROVAL_POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.APPROVAL_POST_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as expenseApprovalPostReducer };