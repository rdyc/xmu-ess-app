import { IQuerySingleState } from '@generic/interfaces';
import { IKPIMeasurementDeleteRequest } from '@KPI/classes/queries/measurement';
import { KPIMeasurementAction as Action } from '@KPI/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IKPIMeasurementDeleteRequest, boolean> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IKPIMeasurementDeleteRequest, boolean>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.DELETE_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.DELETE_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.DELETE_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.DELETE_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as KPIMeasurementDeleteReducer };