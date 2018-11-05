import { IQueryCollectionState } from '@generic/interfaces';
import { ISummaryGetWinningRequest } from '@summary/classes/queries';
import { ISummaryWinning } from '@summary/classes/response/winning';
import { SummaryAction as Action } from '@summary/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<ISummaryGetWinningRequest, ISummaryWinning> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<ISummaryGetWinningRequest, ISummaryWinning>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_WINNING_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_WINNING_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_WINNING_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_WINNING_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as summaryGetWinningReducer };