import { IQueryCollectionState } from '@generic/interfaces';
import { IKPIMeasurementGetByCategoryRequest } from '@kpi/classes/queries/measurement';
import { IKPIMeasurement } from '@kpi/classes/response/measurement';
import { KPIMeasurementAction as Action } from '@kpi/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IKPIMeasurementGetByCategoryRequest, IKPIMeasurement> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IKPIMeasurementGetByCategoryRequest, IKPIMeasurement>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BYCATEGORY_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_BYCATEGORY_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_BYCATEGORY_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BYCATEGORY_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as kpiMeasurementGetByCategoryReducer };