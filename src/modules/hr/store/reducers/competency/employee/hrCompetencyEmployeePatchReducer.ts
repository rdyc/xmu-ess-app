import { IQuerySingleState } from '@generic/interfaces';
import { IHrCompetencyEmployeePatchRequest } from '@hr/classes/queries';
import { IHrCompetencyEmployee } from '@hr/classes/response';
import { HrCompetencyEmployeeAction as Action } from '@hr/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IHrCompetencyEmployeePatchRequest, IHrCompetencyEmployee> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IHrCompetencyEmployeePatchRequest, IHrCompetencyEmployee>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PATCH_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.PATCH_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.PATCH_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PATCH_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as hrCompetencyEmployeePatchReducer };