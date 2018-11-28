import { IBaseCommand } from '@generic/interfaces';
import { ILookupRolePostPayload } from '@lookup/classes/request/role';

export interface ILookupRolePostRequest extends IBaseCommand<ILookupRolePostPayload> {
  companyUid: string;
}