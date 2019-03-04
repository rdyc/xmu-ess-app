import { action } from 'typesafe-actions';

import { INotification, INotificationMark } from '../../interfaces';
import { INotificationQuery } from '../../interfaces/INotificationQuery';
import { NotificationAction } from '../../types';

export const notificationGetAllRequest = (params: INotificationQuery) => action(NotificationAction.GET_ALL_REQUEST, params);
export const notificationGetAllSuccess = (data: INotification) => action(NotificationAction.GET_ALL_SUCCESS, data);
export const notificationGetAllError = (error: any) => action(NotificationAction.GET_ALL_ERROR, error);
export const notificationGetAllDispose = () => action(NotificationAction.GET_ALL_DISPOSE);
export const notificationComplete = (params: INotificationMark) => action(NotificationAction.COMPLETE, params);