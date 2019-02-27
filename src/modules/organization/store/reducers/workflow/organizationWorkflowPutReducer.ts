import { IQuerySingleState } from '@generic/interfaces';
import { IOrganizationWorkflowPutRequest } from '@organization/classes/queries/workflow';
import { IWorkflow } from '@organization/classes/response/workflow';
import { OrganizationWorkflowAction as Action } from '@organization/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IOrganizationWorkflowPutRequest, IWorkflow> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IOrganizationWorkflowPutRequest, IWorkflow>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.PUT_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.PUT_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as organizationWorkflowPutReducer };