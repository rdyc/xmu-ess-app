import { IQueryCollectionState } from '@generic/interfaces';
import { ITravelApprovalGetAllRequest } from '@travel/classes/queries/requestApproval/ITravelApprovalGetAllRequest';
import { ITravelRequest } from '@travel/classes/response';
import { TravelApprovalAction as Action } from '@travel/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<ITravelApprovalGetAllRequest, ITravelRequest> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<ITravelApprovalGetAllRequest, ITravelRequest>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as travelApprovalGetAllReducer };