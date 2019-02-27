import { IQuerySingleState } from '@generic/interfaces';
import { IOrganizationStructurePutRequest } from '@organization/classes/queries/structure';
import { IStructure } from '@organization/classes/response/structure';
import { OrganizationStructureAction as Action } from '@organization/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IOrganizationStructurePutRequest, IStructure> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IOrganizationStructurePutRequest, IStructure>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_STRUCTURE_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.PUT_STRUCTURE_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.PUT_STRUCTURE_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_STRUCTURE_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as organizationStructurePutReducer };