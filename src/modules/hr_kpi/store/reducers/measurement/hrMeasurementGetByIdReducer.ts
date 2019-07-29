import { IQuerySingleState } from '@generic/interfaces';
import { IKPIMeasurementGetDetailRequest } from '@KPI/classes/queries/measurement';
import { IKPIMeasurementDetail } from '@KPI/classes/response/measurement';
import { KPIMeasurementAction as Action } from '@KPI/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IKPIMeasurementGetDetailRequest, IKPIMeasurementDetail> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IKPIMeasurementGetDetailRequest, IKPIMeasurementDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_BY_ID_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_BY_ID_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as KPIMeasurementGetByIdReducer };