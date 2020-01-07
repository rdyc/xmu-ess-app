import { IQuerySingleState } from '@generic/interfaces';
import { IHrCompetencyEmployeeGetResultRequest } from '@hr/classes/queries';
import { IHrCompetencyEmployeeDetail } from '@hr/classes/response';
import { HrCompetencyEmployeeAction as Action } from '@hr/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IHrCompetencyEmployeeGetResultRequest, IHrCompetencyEmployeeDetail> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IHrCompetencyEmployeeGetResultRequest, IHrCompetencyEmployeeDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.RESULT_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.RESULT_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.RESULT_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.RESULT_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as hrCompetencyEmployeeGetResultReducer };