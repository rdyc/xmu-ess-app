import { IQueryCollectionState } from '@generic/interfaces';
import { ISummaryGetEffectivenessRequest } from '@summary/classes/queries';
import { ISummaryEffectiveness } from '@summary/classes/response/effectiveness';
import { SummaryAction as Action } from '@summary/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<ISummaryGetEffectivenessRequest, ISummaryEffectiveness> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<ISummaryGetEffectivenessRequest, ISummaryEffectiveness>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_EFFECTIVENESS_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_EFFECTIVENESS_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_EFFECTIVENESS_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_EFFECTIVENESS_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as summaryGetEffectivenessReducer };