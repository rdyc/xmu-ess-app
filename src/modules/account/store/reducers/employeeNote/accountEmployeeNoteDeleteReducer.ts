import { IEmployeeNoteDeleteRequest } from '@account/classes/queries/employeeNote';
import { AccountEmployeeNoteAction as Action } from '@account/store/actions';
import { IQuerySingleState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IEmployeeNoteDeleteRequest, boolean> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IEmployeeNoteDeleteRequest, boolean>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.DELETE_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.DELETE_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.DELETE_DISPOSE: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.DELETE_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as accountEmployeeNoteDeleteReducer };