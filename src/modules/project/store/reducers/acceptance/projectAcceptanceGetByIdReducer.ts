import { IQuerySingleState } from '@generic/interfaces';
import { IProjectAcceptanceGetByIdRequest } from '@project/classes/queries/acceptance';
import { IProjectAssignmentDetailItem } from '@project/classes/response';
import { ProjectAcceptanceAction as Action } from '@project/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IProjectAcceptanceGetByIdRequest, IProjectAssignmentDetailItem> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IProjectAcceptanceGetByIdRequest, IProjectAssignmentDetailItem>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_BY_ID_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_BY_ID_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as projectAcceptanceGetByIdReducer };