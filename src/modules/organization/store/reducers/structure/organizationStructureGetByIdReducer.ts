import { IQuerySingleState } from '@generic/interfaces';
import { IOrganizationStructureByIdRequest } from '@organization/classes/queries/structure';
import { IStructureDetail } from '@organization/classes/response/structure';
import { OrganizationStructureAction as Action } from '@organization/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IOrganizationStructureByIdRequest, IStructureDetail> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IOrganizationStructureByIdRequest, IStructureDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_STRUCTURE_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_BY_ID_STRUCTURE_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_BY_ID_STRUCTURE_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_STRUCTURE_DISPOSE: return { ...state, isExpired: true };
    
    default: return state;
  }
};

export { reducer as organizationStructureGetByIdReducer };