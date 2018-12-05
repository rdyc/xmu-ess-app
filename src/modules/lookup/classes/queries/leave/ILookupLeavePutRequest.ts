import { IBaseCommand } from '@generic/interfaces';
import { ILookupLeavePutPayload } from '@lookup/classes/request';

export interface ILookupLeavePutRequest extends IBaseCommand<ILookupLeavePutPayload> {
  companyUid: string;
  leaveUid: string;
}