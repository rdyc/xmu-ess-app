import { IQueryCollectionState } from '@generic/interfaces';
import { ISummaryGetWinningRequest } from '@summary/classes/queries';
import { ISummaryWinning } from '@summary/classes/response/winning';
import { SummaryAction as Action } from '@summary/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<ISummaryGetWinningRequest, ISummaryWinning> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<ISummaryGetWinningRequest, ISummaryWinning>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_WINNING_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_WINNING_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_WINNING_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_WINNING_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as summaryGetWinningReducer };