import { IQuerySingleState } from '@generic/interfaces';
import { IEmployeeFinalGetDetailRequest } from '@profile/classes/queries';
import { IEmployeeFinalDetail } from '@profile/classes/response';
import { Reducer } from 'redux';
import { EmployeeFinalAction as Action } from '../actions';

const initialState: IQuerySingleState<IEmployeeFinalGetDetailRequest, IEmployeeFinalDetail> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};
const reducer: Reducer<IQuerySingleState<IEmployeeFinalGetDetailRequest, IEmployeeFinalDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_BY_ID_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_BY_ID_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_DISPOSE: return { ...state, isExpired: true };
    
    default: return state;
  }
};

export { reducer as employeeFinalGetDetailReducer };