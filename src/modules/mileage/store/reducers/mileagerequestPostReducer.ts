import { IQuerySingleState } from '@generic/interfaces';
import { IMileageRequestPostRequest } from '@mileage/classes/queries';
import { IMileageRequest } from '@mileage/classes/response';
import { MileageRequestAction as Action } from '@mileage/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IMileageRequestPostRequest, IMileageRequest> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IMileageRequestPostRequest, IMileageRequest>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return initialState;

    default: { return state; }
  }
};

export { reducer as mileagerequestPostReducer };