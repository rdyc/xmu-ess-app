import { IResponseList } from '../../../generic/interfaces/IResponseList';
import { INotification } from './INotification';
import { INotificationQuery } from './INotificationQuery';

export interface INotificationState {
    isExpired: boolean;
    isLoading: boolean;
    isError: boolean;
    response?: IResponseList<INotification>;
    parameter?: INotificationQuery;
    errors?: any;
}