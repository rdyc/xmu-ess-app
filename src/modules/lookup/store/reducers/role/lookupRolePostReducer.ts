import { IQuerySingleState } from '@generic/interfaces';
import { ILookupRolePostRequest } from '@lookup/classes/queries/role';
import { IRole } from '@lookup/classes/response';
import { LookupRoleAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ILookupRolePostRequest, IRole> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<ILookupRolePostRequest, IRole>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as lookupRolePostReducer };