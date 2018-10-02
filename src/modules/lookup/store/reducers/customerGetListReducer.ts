import { IQueryCollectionState } from '@generic/interfaces';
import { ICustomerListRequest } from '@lookup/interfaces/queries';
import { ICustomerList } from '@lookup/interfaces/response';
import { CustomerAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<ICustomerListRequest, ICustomerList> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<ICustomerListRequest, ICustomerList>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_LIST_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_LIST_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_LIST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_LIST_DISPOSE: return state = initialState;

    default: { return state; }
  }
};

export { reducer as customerGetListReducer };