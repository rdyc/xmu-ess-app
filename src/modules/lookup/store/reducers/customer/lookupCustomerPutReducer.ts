import { IQuerySingleState } from '@generic/interfaces';
import { ILookupCustomerPutRequest } from '@lookup/classes/queries/customer';
import { ICustomer } from '@lookup/classes/response';
import { LookupCustomerAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ILookupCustomerPutRequest, ICustomer> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ILookupCustomerPutRequest, ICustomer>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.PUT_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.PUT_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_DISPOSE: return { ...state, isLoading: false, isError: false, request: undefined, response: undefined };
    
    default: return state;
  }
};

export { reducer as lookupCustomerPutReducer };