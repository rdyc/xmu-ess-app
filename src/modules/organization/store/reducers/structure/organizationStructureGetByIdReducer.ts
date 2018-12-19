import { IQuerySingleState } from '@generic/interfaces';
import { IOrganizationStructureByIdRequest } from '@organization/classes/queries/structure';
import { IStructureDetail } from '@organization/classes/response/structure';
import { OrganizationStructureAction as Action } from '@organization/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IOrganizationStructureByIdRequest, IStructureDetail> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IOrganizationStructureByIdRequest, IStructureDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_STRUCTURE_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.GET_BY_ID_STRUCTURE_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.GET_BY_ID_STRUCTURE_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_STRUCTURE_DISPOSE: return { ...state, isLoading: false, isError: false, request: undefined, response: undefined };
    
    default: return state;
  }
};

export { reducer as organizationStructureGetByIdReducer };