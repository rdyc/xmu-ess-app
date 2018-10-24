import { IQueryCollectionState } from '@generic/interfaces';
import { ILookupCustomerGetListRequest } from '@lookup/classes/queries';
import { ICustomerList } from '@lookup/classes/response';
import { LookupCustomerAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<ILookupCustomerGetListRequest, ICustomerList> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<ILookupCustomerGetListRequest, ICustomerList>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_LIST_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_LIST_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_LIST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_LIST_DISPOSE: return { ...state, isLoading: false, isError: false, request: undefined, response: undefined };

    default: { return state; }
  }
};

export { reducer as lookupCustomerGetListReducer };