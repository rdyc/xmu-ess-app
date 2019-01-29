import { IQueryCollectionState } from '@generic/interfaces';
import { ISliderGetRequest } from '@home/classes/queries/slider';
import { ISliderList } from '@home/classes/response/slider';
import { Reducer } from 'redux';
import { SliderAction as Action } from '../../actions/sliderActions';

const initialState: IQueryCollectionState<ISliderGetRequest, ISliderList> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<ISliderGetRequest, ISliderList>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_DISPOSE: return initialState;

    default: { return state; }
  }
};

export { reducer as sliderGetReducer };