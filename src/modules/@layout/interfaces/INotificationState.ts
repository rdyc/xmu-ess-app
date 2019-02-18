import { IResponseList } from '../../../generic/interfaces/IResponseList';
import { INotification } from './INotification';
import { INotificationQuery } from './INotificationQuery';

export interface INotificationState {
    response?: IResponseList<INotification>;
    parameter?: INotificationQuery;
    isLoading: boolean;
    isError: boolean;
    errors?: any;
}