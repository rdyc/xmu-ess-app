import { IQueryCollectionState } from '@generic/interfaces';
import { IProjectAcceptanceGetAllRequest } from '@project/classes/queries/acceptance';
import { IProjectAssignment } from '@project/classes/response';
import { ProjectAcceptanceAction as Action } from '@project/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IProjectAcceptanceGetAllRequest, IProjectAssignment> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<IProjectAcceptanceGetAllRequest, IProjectAssignment>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as projectAcceptanceGetAllReducer };