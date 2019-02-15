import { IQuerySingleState } from '@generic/interfaces';
import { IOrganizationStructureDeleteRequest } from '@organization/classes/queries/structure';
import { OrganizationStructureAction as Action } from '@organization/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IOrganizationStructureDeleteRequest, boolean> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IOrganizationStructureDeleteRequest, boolean>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.DELETE_STRUCTURE_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.DELETE_STRUCTURE_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.DELETE_STRUCTURE_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.DELETE_STRUCTURE_DISPOSE: return { ...state, isLoading: false, isError: false, request: undefined, response: undefined };
    
    default: return state;
  }
};

export { reducer as organizationStructureDeleteReducer };