import { IEmployeeMyState } from '@account/interfaces';
import { EmployeeMyAction } from '@account/store/actions';
import { Reducer } from 'redux';

const initialState: IEmployeeMyState = {
  employee: undefined,
  errors: undefined,
  loading: false
};

const reducer: Reducer<IEmployeeMyState> = (state = initialState, action) => {
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