import { IQueryCollectionState } from '@generic/interfaces';
import { IOrganizationWorkflowAllRequest } from '@organization/classes/queries/workflow';
import { IWorkflow } from '@organization/classes/response/workflow';
import { OrganizationWorkflowAction as Action } from '@organization/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IOrganizationWorkflowAllRequest, IWorkflow> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<IOrganizationWorkflowAllRequest, IWorkflow>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_DISPOSE: return { ...state, isLoading: false, isError: false, request: undefined, response: undefined };

    default: { return state; }
  }
};

export { reducer as organizationWorkflowGetAllReducer };