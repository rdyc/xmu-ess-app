import { IQuerySingleState } from '@generic/interfaces';
import { IProjectApprovalGetByIdRequest } from '@project/classes/queries/approval';
import { IProjectDetail } from '@project/classes/response';
import { ProjectApprovalAction as Action } from '@project/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IProjectApprovalGetByIdRequest, IProjectDetail> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IProjectApprovalGetByIdRequest, IProjectDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.GET_BY_ID_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.GET_BY_ID_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as projectApprovalGetByIdReducer };