import { IQueryCollectionState } from '@generic/interfaces';
import { IAccountEmployeeCompetencyGetAllRequest } from '@hr/classes/queries';
import { IAccountEmployeeCompetency } from '@hr/classes/response';
import { HrCompetencyAssessmentAction as Action } from '@hr/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IAccountEmployeeCompetencyGetAllRequest, IAccountEmployeeCompetency> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IAccountEmployeeCompetencyGetAllRequest, IAccountEmployeeCompetency>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_EMPLOYEE_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_EMPLOYEE_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_EMPLOYEE_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_EMPLOYEE_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as accountEmployeeCompetencyGetAllReducer };