import { IResponseList } from '../../../generic/interfaces/IResponseList';
import { INotification } from './INotification';
import { INotificationQuery } from './INotificationQuery';

export interface INotificationState {
    readonly result: IResponseList<INotification> | undefined;
    readonly parameter: INotificationQuery | undefined;
    readonly loading: boolean;
    readonly errors?: string | null;
}