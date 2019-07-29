import { IQueryCollectionState } from '@generic/interfaces';
import { IKPIMeasurementGetListRequest } from '@KPI/classes/queries/measurement';
import { IKPIMeasurementList } from '@KPI/classes/response/measurement';
import { KPIMeasurementAction as Action } from '@KPI/store/actions/measurement/KPIMeasurementActions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IKPIMeasurementGetListRequest, IKPIMeasurementList> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IKPIMeasurementGetListRequest, IKPIMeasurementList>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_LIST_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_LIST_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_LIST_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_LIST_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as KPIMeasurementGetListReducer };