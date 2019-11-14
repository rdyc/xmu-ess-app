import { IEmployee } from '@account/classes/response';
import { IQueryCollectionState } from '@generic/interfaces';
import { IOrganizationStructureSubOrdinateListRequest } from '@organization/classes/queries/structure';
import { OrganizationStructureAction as Action } from '@organization/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IOrganizationStructureSubOrdinateListRequest, IEmployee> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IOrganizationStructureSubOrdinateListRequest, IEmployee>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_SUBORDINATE_LIST_STRUCTURE_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_SUBORDINATE_LIST_STRUCTURE_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_SUBORDINATE_LIST_STRUCTURE_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_SUBORDINATE_LIST_STRUCTURE_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as organizationStructureGetSubOrdinateListReducer };