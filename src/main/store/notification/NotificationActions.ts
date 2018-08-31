import { action } from 'typesafe-actions';
import { NotificationAction } from './actions/NotificationAction';
import { NotificationType } from './types/NotificationType';
import { NotificationParameter } from './types/NotificationParameter';

// tslint:disable-next-line:max-line-length
export const notificationFetchRequest = (params: NotificationParameter) => action(NotificationAction.FETCH_REQUEST, params);
export const notificationFetchSuccess = (data: NotificationType) => action(NotificationAction.FETCH_SUCCESS, data);
export const notificationFetchError = (message: string) => action(NotificationAction.FETCH_ERROR, message);