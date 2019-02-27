import { IQuerySingleState } from '@generic/interfaces';
import { IGalleryPostRequest } from '@lookup/classes/queries/gallery';
import { IGallery } from '@lookup/classes/response/gallery';
import { ImageGalleryAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IGalleryPostRequest, IGallery> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IGalleryPostRequest, IGallery>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as imageGalleryPostReducer };