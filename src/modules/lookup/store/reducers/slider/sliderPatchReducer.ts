import { IQueryCollectionState } from '@generic/interfaces';
import { ISliderPatchRequest } from '@lookup/classes/queries/slider';
import { ISliderList } from '@lookup/classes/response/slider';
import { Reducer } from 'redux';
import { SliderAction as Action } from '../../actions/sliderActions';

const initialState: IQueryCollectionState<ISliderPatchRequest, ISliderList> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<ISliderPatchRequest, ISliderList>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PATCH_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.PATCH_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.PATCH_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PATCH_DISPOSE: return { ...state, ...initialState };

    default: return state; 
  }
};

export { reducer as sliderPatchReducer };