import { Reducer } from 'redux';
import { NotificationState } from './states/NotificationState';
import { NotificationAction } from './actions/NotificationAction';

const initialState: NotificationState = {
  result: undefined,
  parameter: undefined,
  errors: undefined,
  loading: false
};

const reducer: Reducer<NotificationState> = (state = initialState, action) => {
  switch (action.type) {
    case NotificationAction.FETCH_REQUEST: {
      return { 
        ...state, 
        loading: true, 
        parameter: action.payload
      };
    }
    case NotificationAction.FETCH_SUCCESS: {
      return { 
        ...state, 
        loading: false, 
        result: action.payload 
      };
    }
    case NotificationAction.FETCH_ERROR: {
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

export { reducer as notificationReducer };