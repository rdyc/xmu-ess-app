import { IQuerySingleState } from '@generic/interfaces';
import { IKPIEmployeeGetByYearRequest } from '@kpi/classes/queries';
import { IKPIEmployeeDetail } from '@kpi/classes/response';
import { KPIEmployeeAction as Action } from '@kpi/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IKPIEmployeeGetByYearRequest, IKPIEmployeeDetail> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IKPIEmployeeGetByYearRequest, IKPIEmployeeDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_YEAR_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_BY_YEAR_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_BY_YEAR_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_YEAR_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as kpiEmployeeGetByYearReducer };