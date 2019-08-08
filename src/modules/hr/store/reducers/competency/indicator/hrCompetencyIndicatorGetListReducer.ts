import { IQueryCollectionState } from '@generic/interfaces';
import { IHrCompetencyIndicatorGetListRequest } from '@hr/classes/queries';
import { IHrCompetencyIndicatorList } from '@hr/classes/response';
import { HrCompetencyIndicatorAction as Action } from '@hr/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IHrCompetencyIndicatorGetListRequest, IHrCompetencyIndicatorList> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IHrCompetencyIndicatorGetListRequest, IHrCompetencyIndicatorList>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_LIST_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_LIST_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_LIST_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_LIST_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as hrCompetencyIndicatorGetListReducer };