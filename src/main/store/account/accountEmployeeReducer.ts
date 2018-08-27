import { Reducer } from 'redux';
import { AccountEmployeeMyState } from './states/AccountEmployeeMyState';
import { AccountEmployeeAction } from './actions/AccountEmployeeAction';

const initialState: AccountEmployeeMyState = {
  employee: undefined,
  errors: undefined,
  loading: false
};

const reducer: Reducer<AccountEmployeeMyState> = (state = initialState, action) => {
  switch (action.type) {
    case AccountEmployeeAction.FETCH_REQUEST: {
      return { 
        ...state, 
        loading: true, 
        employee: action.payload
      };
    }
    case AccountEmployeeAction.FETCH_SUCCESS: {
      return { 
        ...state, 
        loading: false, 
        employee: action.payload 
      };
    }
    case AccountEmployeeAction.FETCH_ERROR: {
      return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as accountEmployeeReducer };