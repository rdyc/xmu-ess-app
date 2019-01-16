import { Reducer } from 'redux';

import { INotificationState } from '../../interfaces/INotificationState';
import { NotificationAction } from '../../types';

const initialState: INotificationState = {
  response: undefined,
  parameter: undefined,
  errors: undefined,
  isLoading: false
};

const reducer: Reducer<INotificationState> = (state = initialState, action) => {
  switch (action.type) {
    case NotificationAction.FETCH_REQUEST: {
      return { 
        ...state, 
        isLoading: true, 
        parameter: action.payload
      };
    }
    case NotificationAction.FETCH_SUCCESS: {
      return { 
        ...state, 
        isLoading: false, 
        response: action.payload 
      };
    }
    case NotificationAction.FETCH_ERROR: {
      return { 
        ...state, 
        isLoading: false, 
        errors: action.payload 
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as notificationReducer };