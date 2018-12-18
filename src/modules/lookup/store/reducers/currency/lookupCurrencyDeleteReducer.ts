import { IQuerySingleState } from '@generic/interfaces';
import { ICurrencyDeleteRequest } from '@lookup/classes/queries/currency';
import { ICurrency } from '@lookup/classes/response/currency';
import { LookupCurrencyAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ICurrencyDeleteRequest, ICurrency> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ICurrencyDeleteRequest, ICurrency>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.DELETE_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.DELETE_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.DELETE_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.DELETE_DISPOSE: return initialState;

    default: return state;
  }
};

export { reducer as lookupCurrencyDeleteReducer };