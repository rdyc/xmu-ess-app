import { IQuerySingleState } from '@generic/interfaces';
import { IOrganizationWorkflowMenuRequest } from '@organization/classes/queries/workflow';
import { IWorkflowMenu } from '@organization/classes/response/workflow/IWorkflowMenu';
import { OrganizationWorkflowAction as Action } from '@organization/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IOrganizationWorkflowMenuRequest, IWorkflowMenu> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IOrganizationWorkflowMenuRequest, IWorkflowMenu>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_MENU_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_BY_MENU_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_BY_MENU_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_MENU_DISPOSE: return { ...state, isExpired: true };
    
    default: return state;
  }
};

export { reducer as organizationWorkflowGetByMenuReducer };