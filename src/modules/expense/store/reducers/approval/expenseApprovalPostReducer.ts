import { IExpenseApprovalPostRequest } from '@expense/classes/queries/approval';
import { IExpense } from '@expense/classes/response';
import { ExpenseApprovalAction as Action } from '@expense/store/actions';
import { IQuerySingleState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IExpenseApprovalPostRequest, IExpense> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IExpenseApprovalPostRequest, IExpense>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.APPROVAL_POST_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.APPROVAL_POST_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.APPROVAL_POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.APPROVAL_POST_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as expenseApprovalPostReducer };