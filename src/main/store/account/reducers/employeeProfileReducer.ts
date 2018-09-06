import { Reducer } from 'redux';
import { EmployeeProfileState } from '../states/EmployeeProfileState';
import { EmployeeProfileAction } from '../actions/employeeProfileActions';

const initialState: EmployeeProfileState = {
  parameter: undefined,
  response: undefined,
  errors: undefined,
  loading: false
};

const reducer: Reducer<EmployeeProfileState> = (state = initialState, action) => {
  switch (action.type) {
    case EmployeeProfileAction.FETCH_REQUEST: {
      return { ...state, loading: true, parameter: action.payload };
    }
    case EmployeeProfileAction.FETCH_SUCCESS: {
      return { ...state, loading: false, response: action.payload };
    }
    case EmployeeProfileAction.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: { return state; }
  }
};

export { reducer as employeeProfileReducer };