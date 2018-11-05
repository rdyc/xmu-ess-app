import { ILeaveGetEndState } from '@leave/classes/states/ILeaveState';
import { LeaveRequestAction } from '@leave/store/actions';
import { Reducer } from 'redux';

const initialState: ILeaveGetEndState = {
  result: undefined,
  parameter: undefined,
  errors: undefined,
  loading: false
};

const reducer: Reducer<ILeaveGetEndState> = (state = initialState, action) => {
  switch (action.type) {
    case LeaveRequestAction.FETCH_REQUEST: {
      return { 
        ...state, 
        loading: true, 
        parameter: action.payload
      };
    }
    case LeaveRequestAction.FETCH_SUCCESS: {
      return { 
        ...state, 
        loading: false, 
        result: action.payload 
      };
    }
    case LeaveRequestAction.FETCH_ERROR: {
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

export { reducer as leaveRequestGetEndReducer };