import { IEmployeeProfileCommandState } from '@account/classes';
import { EmployeeProfileAction } from '@account/store/actions';
import { Reducer } from 'redux';

const initialState: IEmployeeProfileCommandState = {
  method: undefined,
  parameter: undefined,
  response: undefined,
  errors: undefined,
  loading: false
};

const reducer: Reducer<IEmployeeProfileCommandState> = (state = initialState, action) => {
  switch (action.type) {
    case EmployeeProfileAction.COMMAND_REQUEST: {
      return { ...state, loading: true, parameter: action.payload };
    }
    case EmployeeProfileAction.COMMAND_SUCCESS: {
      return { ...state, loading: false, response: action.payload };
    }
    case EmployeeProfileAction.COMMAND_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: { return state; }
  }
};

export { reducer as employeeProfileCommandReducer };