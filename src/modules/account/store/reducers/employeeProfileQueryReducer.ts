import { IEmployeeProfileQueryState } from '@account/classes';
import { EmployeeProfileAction } from '@account/store/actions';
import { Reducer } from 'redux';

const initialState: IEmployeeProfileQueryState = {
  parameter: undefined,
  response: undefined,
  errors: undefined,
  loading: false
};

const reducer: Reducer<IEmployeeProfileQueryState> = (state = initialState, action) => {
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

export { reducer as employeeProfileQueryReducer };