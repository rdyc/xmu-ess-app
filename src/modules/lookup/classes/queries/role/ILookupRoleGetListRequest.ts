import { ILookupRoleGetListFilter } from '@lookup/classes/filters/role';

export interface ILookupRoleGetListRequest {
  readonly filter: ILookupRoleGetListFilter | undefined;
}