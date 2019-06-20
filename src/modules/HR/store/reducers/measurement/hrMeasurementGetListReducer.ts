import { IQueryCollectionState } from '@generic/interfaces';
import { IHRMeasurementGetListRequest } from '@hr/classes/queries/measurement';
import { IHRMeasurementList } from '@hr/classes/response/measurement';
import { HRMeasurementAction as Action } from '@hr/store/actions/measurement/hrMeasurementActions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IHRMeasurementGetListRequest, IHRMeasurementList> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IHRMeasurementGetListRequest, IHRMeasurementList>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_LIST_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_LIST_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_LIST_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_LIST_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as hrMeasurementGetListReducer };