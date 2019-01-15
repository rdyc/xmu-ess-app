import { IResponseList } from '../../../generic/interfaces/IResponseList';
import { INotification } from './INotification';
import { INotificationQuery } from './INotificationQuery';

export interface INotificationState {
    readonly response: IResponseList<INotification> | undefined;
    readonly parameter: INotificationQuery | undefined;
    readonly isLoading: boolean;
    readonly errors?: string | null;
}