import { IQuerySingleState } from '@generic/interfaces';
import { IHRMeasurementPostRequest } from '@hr/classes/queries/measurement';
import { IHRMeasurement } from '@hr/classes/response/measurement';
import { HRMeasurementAction as Action } from '@hr/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IHRMeasurementPostRequest, IHRMeasurement> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IHRMeasurementPostRequest, IHRMeasurement>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as hrMeasurementPostReducer };