import { IQuerySingleState } from '@generic/interfaces';
import { ILookupCurrencyPostRequest } from '@lookup/classes/queries/currency';
import { ICurrency } from '@lookup/classes/response/currency';
import { CurrencyAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ILookupCurrencyPostRequest, ICurrency> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ILookupCurrencyPostRequest, ICurrency>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as lookupCurrencyPostReducer };