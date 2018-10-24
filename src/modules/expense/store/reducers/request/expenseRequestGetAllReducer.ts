import { IExpenseRequestGetAllRequest } from '@expense/classes/queries/request';
import { IExpense } from '@expense/classes/response';
import { ExpenseRequestAction as Action } from '@expense/store/actions';
import { IQueryCollectionState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IExpenseRequestGetAllRequest, IExpense> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<IExpenseRequestGetAllRequest, IExpense>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as expenseRequestGetAllReducer };