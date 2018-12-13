import { IQuerySingleState } from '@generic/interfaces';
import { IOrganizationHierarchyByIdRequest } from '@organization/classes/queries/hierarchy';
import { IHierarchyDetail } from '@organization/classes/response/hierarchy';
import { OrganizationHierarchyAction as Action } from '@organization/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IOrganizationHierarchyByIdRequest, IHierarchyDetail> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IOrganizationHierarchyByIdRequest, IHierarchyDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.GET_BY_ID_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.GET_BY_ID_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_DISPOSE: return { ...state, isLoading: false, isError: false, request: undefined, response: undefined };
    
    default: return state;
  }
};

export { reducer as organizationHierarchyGetByIdReducer };