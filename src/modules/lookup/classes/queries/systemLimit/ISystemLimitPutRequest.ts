import { IBaseCommand } from '@generic/interfaces';
import { ISystemLimitPutPayload } from '@lookup/classes/request';

export interface ISystemLimitPutRequest extends IBaseCommand<ISystemLimitPutPayload> {
  companyUid: string;
  limitUid: string;
}