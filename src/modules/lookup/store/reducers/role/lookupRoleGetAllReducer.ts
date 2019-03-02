import { IQueryCollectionState } from '@generic/interfaces';
import { ILookupRoleGetAllRequest } from '@lookup/classes/queries/role';
import { IRole } from '@lookup/classes/response';
import { LookupRoleAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<ILookupRoleGetAllRequest, IRole> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<ILookupRoleGetAllRequest, IRole>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as lookupRoleGetAllReducer };