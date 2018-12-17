import { IBaseCommand } from '@generic/interfaces';
import { ILookupRolePutPayload } from '@lookup/classes/request/role';

export interface ILookupRolePutRequest extends IBaseCommand<ILookupRolePutPayload> {
  companyUid: string;
  roleUid: string;
}