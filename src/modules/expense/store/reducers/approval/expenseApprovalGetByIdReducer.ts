import { IExpenseApprovalGetByIdRequest } from '@expense/classes/queries/approval';
import { IExpenseDetail } from '@expense/classes/response';
import { ExpenseApprovalAction as Action } from '@expense/store/actions';
import { IQuerySingleState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IExpenseApprovalGetByIdRequest, IExpenseDetail> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IExpenseApprovalGetByIdRequest, IExpenseDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.APPROVAL_GET_BY_ID_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.APPROVAL_GET_BY_ID_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.APPROVAL_GET_BY_ID_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.APPROVAL_GET_BY_ID_DISPOSE: return { ...state, isExpired: true };
    
    default: return state;
  }
};

export { reducer as expenseApprovalGetByIdReducer };