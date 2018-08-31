import { ListResponseType } from '../../@base/ListResponseType';
import { NotificationType } from '../types/NotificationType';
import { NotificationParameter } from '../types/NotificationParameter';

export interface NotificationState {
    readonly result: ListResponseType<NotificationType> | undefined;
    readonly parameter: NotificationParameter | undefined;
    readonly loading: boolean;
    readonly errors?: string | null;
}