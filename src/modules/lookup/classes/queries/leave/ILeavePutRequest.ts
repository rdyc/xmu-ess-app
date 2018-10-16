import { IBaseCommand } from '@generic/interfaces';
import { ILeavePutPayload } from '@lookup/classes/request';

export interface ILeavePutRequest extends IBaseCommand<ILeavePutPayload> {
  companyUid: string;
  leaveUid: string;
}