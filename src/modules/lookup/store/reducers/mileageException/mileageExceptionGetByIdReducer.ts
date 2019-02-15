import { IQuerySingleState } from '@generic/interfaces';
import { IMileageExceptionByIdRequest } from '@lookup/classes/queries';
import { IMileageExceptionDetail } from '@lookup/classes/response';
import { MileageExceptionAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IMileageExceptionByIdRequest, IMileageExceptionDetail> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IMileageExceptionByIdRequest, IMileageExceptionDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_BY_ID_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_BY_ID_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as mileageExceptionGetByIdReducer };