import { IQuerySingleState } from '@generic/interfaces';
import { IInforPostRequest } from '@infor/classes/queries';
import { InforAction as Action } from '@infor/store/actions';
import { IInforResult } from 'modules/infor/classes/response';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IInforPostRequest, IInforResult> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IInforPostRequest, IInforResult>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as inforPostReducer };