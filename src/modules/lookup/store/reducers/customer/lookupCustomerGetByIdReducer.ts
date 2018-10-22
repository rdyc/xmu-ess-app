import { IQuerySingleState } from '@generic/interfaces';
import { ILookupCustomerGetDetailRequest } from '@lookup/classes/queries';
import { ICustomerDetail } from '@lookup/classes/response';
import { LookupCustomerAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ILookupCustomerGetDetailRequest, ICustomerDetail> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ILookupCustomerGetDetailRequest, ICustomerDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.GET_BY_ID_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.GET_BY_ID_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_DISPOSE: return { ...state, isLoading: false, isError: false, request: undefined, response: undefined };
    
    default: return state;
  }
};

export { reducer as lookupCustomerGetByIdReducer };