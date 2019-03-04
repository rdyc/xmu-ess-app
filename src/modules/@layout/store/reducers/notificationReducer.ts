import { IResponseList } from '@generic/interfaces';
import { INotification, INotificationMark } from '@layout/interfaces';
import { Reducer } from 'redux';

import { INotificationState } from '../../interfaces/INotificationState';
import { NotificationAction } from '../../types';

const initialState: INotificationState = {
  isLoading: false,
  isError: false,
  isExpired: false,
  response: undefined,
  parameter: undefined,
  errors: undefined
};

const removeinItem = (params: INotificationMark, current?: IResponseList<INotification>): IResponseList<INotification> | undefined => {
  // clone current response
  const result = current;

  // tslint:disable-next-line:no-debugger
  // debugger;

  if (result && result.data) {
    // get mmodule
    const moduleIndex = result.data.findIndex(item => item.moduleUid === params.moduleUid);

    if (moduleIndex !== -1) {
      // get details
      const detailIndex = result.data[moduleIndex].details.findIndex(item => item.type === params.detailType);

      if (detailIndex !== -1) {
        // handling itemUid type string or array
        if (Array.isArray(params.itemUid)) {
          params.itemUid.forEach(uid => {
            if (result && result.data) {
              // get items
              const itemIndex = result.data[moduleIndex].details[detailIndex].items.findIndex(item => item.uid === uid);

              if (itemIndex !== -1) {
                // remove the item
                result.data[moduleIndex].details[detailIndex].items.splice(itemIndex, 1);
              }
            }
          });
        } else {
          // get items
          const itemIndex = result.data[moduleIndex].details[detailIndex].items.findIndex(item => item.uid === params.itemUid);

          if (itemIndex !== -1) {
            // remove the item
            result.data[moduleIndex].details[detailIndex].items.splice(itemIndex, 1);
          }
        }

        // re-count item 
        const itemCount = result.data[moduleIndex].details[detailIndex].items.length;

        // update total items in detail
        result.data[moduleIndex].details[detailIndex].total = itemCount;
        
        if (itemCount === 0) {
          // remove from details while empty
          result.data[moduleIndex].details.splice(detailIndex, 1);
          
          // re-count details
          const detailCount = result.data[moduleIndex].details.length;

          if (detailCount === 0) {
            // remove from data while empty
            result.data.splice(moduleIndex, 1);
          }
        }
      }
    }
  }

  return result;
};

const reducer: Reducer<INotificationState> = (state = initialState, action) => {
  switch (action.type) {
    case NotificationAction.GET_ALL_REQUEST: {
      return { ...state, isExpired: false, isLoading: true, isError: false, parameter: action.payload };
    }
    case NotificationAction.GET_ALL_SUCCESS: {
      return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    }
    case NotificationAction.GET_ALL_ERROR: {
      return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    }
    case NotificationAction.GET_ALL_DISPOSE: {
      return { ...state, isExpired: true };
    }
    case NotificationAction.COMPLETE: {
      return { ...state, response: removeinItem(action.payload, state.response) };
    }

    default: {
      return state;
    }
  }
};

export { reducer as notificationReducer };