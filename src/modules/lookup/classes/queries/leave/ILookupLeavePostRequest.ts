import { IBaseCommand } from '@generic/interfaces';
import { ILookupLeavePostPayload } from '@lookup/classes/request';

export interface ILookupLeavePostRequest extends IBaseCommand<ILookupLeavePostPayload> {
  companyUid: string;
}