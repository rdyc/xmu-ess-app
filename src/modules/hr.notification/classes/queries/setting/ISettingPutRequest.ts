import { IBaseCommand } from '@generic/interfaces';
import { ISettingPutPayload } from '@hr.notification/classes/request/setting';

export interface ISettingPutRequest extends IBaseCommand<ISettingPutPayload> {
  settingUid: string;
}