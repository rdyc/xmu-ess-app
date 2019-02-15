import { IQuerySingleState } from '@generic/interfaces';
import { IProjectAssignmentGetByIdRequest } from '@project/classes/queries/assignment';
import { IProjectAssignmentDetail } from '@project/classes/response';
import { ProjectAssignmentAction as Action } from '@project/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IProjectAssignmentGetByIdRequest, IProjectAssignmentDetail> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IProjectAssignmentGetByIdRequest, IProjectAssignmentDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_BY_ID_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_BY_ID_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as projectAssignmentGetByIdReducer };