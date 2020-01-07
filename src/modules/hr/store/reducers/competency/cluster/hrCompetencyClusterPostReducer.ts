import { IQuerySingleState } from '@generic/interfaces';
import { IHrCompetencyClusterPostRequest } from '@hr/classes/queries';
import { IHrCompetencyCluster } from '@hr/classes/response';
import { HrCompetencyClusterAction as Action } from '@hr/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IHrCompetencyClusterPostRequest, IHrCompetencyCluster> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IHrCompetencyClusterPostRequest, IHrCompetencyCluster>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as hrCompetencyClusterPostReducer };