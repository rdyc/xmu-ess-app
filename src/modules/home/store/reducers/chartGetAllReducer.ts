import { IQueryCollectionState } from '@generic/interfaces';
import { IChartGetAllRequest } from '@home/classes/queries';
import { IChart } from '@home/classes/response/IChart';
import { Reducer } from 'redux';
import { ChartAction as Action } from '../actions/chartActions';

const initialState: IQueryCollectionState<IChartGetAllRequest, IChart> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<IChartGetAllRequest, IChart>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_DISPOSE: return initialState;

    default: { return state; }
  }
};

export { reducer as chartGetAllReducer };