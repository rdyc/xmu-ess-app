import { Reducer } from 'redux';
import { EmployeeMyState } from '../states/EmployeeMyState';
import { EmployeeMyAction } from '../actions/employeeMyActions';

const initialState: EmployeeMyState = {
  employee: undefined,
  errors: undefined,
  loading: false
};

const reducer: Reducer<EmployeeMyState> = (state = initialState, action) => {
  switch (action.type) {
    case EmployeeMyAction.FETCH_REQUEST: {
      return {...state, loading: true };
    }
    case EmployeeMyAction.FETCH_SUCCESS: {
      return { ...state, loading: false, employee: action.payload };
    }
    case EmployeeMyAction.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }

    default: {
      return state;
    }
  }
};

export { reducer as employeeMyReducer };