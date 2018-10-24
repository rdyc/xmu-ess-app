import { ILookupRoleListFilter } from '@lookup/classes/filters/role';

export interface ILookupRoleListRequest {
  readonly filter: ILookupRoleListFilter | undefined;
}