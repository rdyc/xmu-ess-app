import { IQuerySingleState } from '@generic/interfaces';
import { IOrganizationHierarchyPostRequest } from '@organization/classes/queries/hierarchy';
import { IHierarchy } from '@organization/classes/response/hierarchy';
import { OrganizationHierarchyAction as Action } from '@organization/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IOrganizationHierarchyPostRequest, IHierarchy> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IOrganizationHierarchyPostRequest, IHierarchy>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return { ...state, isLoading: false, isError: false, request: undefined, response: undefined };
    
    default: return state;
  }
};

export { reducer as organizationHierarchyPostReducer };