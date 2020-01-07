import { IQueryCollectionState } from '@generic/interfaces';
import { IHrCompetencyEmployeeGetDetailListRequest } from '@hr/classes/queries';
import { IHrCompetencyEmployeeDetailList } from '@hr/classes/response';
import { HrCompetencyResultAction as Action } from '@hr/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IHrCompetencyEmployeeGetDetailListRequest, IHrCompetencyEmployeeDetailList> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IHrCompetencyEmployeeGetDetailListRequest, IHrCompetencyEmployeeDetailList>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_DETAIL_LIST_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_DETAIL_LIST_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_DETAIL_LIST_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_DETAIL_LIST_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as hrCompetencyResultGetDetailListReducer };