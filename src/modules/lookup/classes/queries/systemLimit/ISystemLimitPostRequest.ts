import { IBaseCommand } from '@generic/interfaces';
import { ISystemLimitPostPayload } from '@lookup/classes/request';

export interface ISystemLimitPostRequest extends IBaseCommand<ISystemLimitPostPayload> {
  companyUid: string;
}