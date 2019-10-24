import { IBaseCommand } from '@generic/interfaces';
import { INotifSettingPutPayload } from '@hr.notification/classes/request/setting';

export interface INotifSettingPutRequest extends IBaseCommand<INotifSettingPutPayload> {
  settingUid: string;
}