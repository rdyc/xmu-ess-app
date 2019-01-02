import { IEmployeeExperienceByIdRequest } from '@account/classes/queries/employeeExperience';
import { IEmployeeExperienceDetail } from '@account/classes/response/employeeExperience';
import { AccountEmployeeExperienceAction as Action } from '@account/store/actions';
import { IQuerySingleState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IEmployeeExperienceByIdRequest, IEmployeeExperienceDetail> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IEmployeeExperienceByIdRequest, IEmployeeExperienceDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.GET_BY_ID_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.GET_BY_ID_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as accountEmployeeExperienceGetByIdReducer };