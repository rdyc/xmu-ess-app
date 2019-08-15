import { IQueryCollectionState } from '@generic/interfaces';
import { ISummaryGetMappingRequest } from '@summary/classes/queries';
import { ISummaryMapping } from '@summary/classes/response/mapping';
import { SummaryAction as Action } from '@summary/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<ISummaryGetMappingRequest, ISummaryMapping> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<ISummaryGetMappingRequest, ISummaryMapping>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_MAPPING_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_MAPPING_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_MAPPING_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_MAPPING_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as summaryGetMappingReducer };