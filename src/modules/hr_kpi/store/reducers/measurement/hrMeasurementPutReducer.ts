import { IQuerySingleState } from '@generic/interfaces';
import { IKPIMeasurementPutRequest } from '@KPI/classes/queries/measurement';
import { IKPIMeasurement } from '@KPI/classes/response/measurement';
import { KPIMeasurementAction as Action } from '@KPI/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IKPIMeasurementPutRequest, IKPIMeasurement> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IKPIMeasurementPutRequest, IKPIMeasurement>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.PUT_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.PUT_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as KPIMeasurementPutReducer };