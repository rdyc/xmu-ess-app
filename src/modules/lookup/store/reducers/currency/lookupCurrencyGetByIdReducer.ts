import { IQuerySingleState } from '@generic/interfaces';
import { ICurrencyGetByIdRequest } from '@lookup/classes/queries';
import { ICurrencyDetail } from '@lookup/classes/response';
import { LookupCurrencyAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ICurrencyGetByIdRequest, ICurrencyDetail> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ICurrencyGetByIdRequest, ICurrencyDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.GET_BY_ID_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.GET_BY_ID_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_DISPOSE: return initialState;

    default: return state;
  }
};

export { reducer as currencyGetByIdReducer };