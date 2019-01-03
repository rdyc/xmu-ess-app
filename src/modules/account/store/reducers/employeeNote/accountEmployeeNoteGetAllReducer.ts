import { IEmployeeNoteAllRequest } from '@account/classes/queries/employeeNote';
import { IEmployeeNote } from '@account/classes/response/employeeNote';
import { AccountEmployeeNoteAction as Action } from '@account/store/actions';
import { IQueryCollectionState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IEmployeeNoteAllRequest, IEmployeeNote> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<IEmployeeNoteAllRequest, IEmployeeNote>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_DISPOSE: return initialState;

    default: { return state; }
  }
};

export { reducer as accountEmployeeNoteGetAllReducer };