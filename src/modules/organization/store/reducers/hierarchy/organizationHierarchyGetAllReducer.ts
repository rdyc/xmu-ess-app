import { IQueryCollectionState } from '@generic/interfaces';
import { IOrganizationHierarchyAllRequest } from '@organization/classes/queries/hierarchy';
import { IHierarchy } from '@organization/classes/response/hierarchy';
import { OrganizationHierarchyAction as Action } from '@organization/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IOrganizationHierarchyAllRequest, IHierarchy> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<IOrganizationHierarchyAllRequest, IHierarchy>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_DISPOSE: return { ...state, isLoading: false, isError: false, request: undefined, response: undefined };

    default: { return state; }
  }
};

export { reducer as organizationHierarchyGetAllReducer };