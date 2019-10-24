import { IQuerySingleState } from '@generic/interfaces';
import { IHrCompetencyAssessmentPostRequest } from '@hr/classes/queries';
import { IHrCompetencyAssessment } from '@hr/classes/response';
import { HrCompetencyAssessmentAction as Action } from '@hr/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IHrCompetencyAssessmentPostRequest, IHrCompetencyAssessment> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IHrCompetencyAssessmentPostRequest, IHrCompetencyAssessment>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as hrCompetencyAssessmentPostReducer };