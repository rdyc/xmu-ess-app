import { ILookupRoleGetAllFilter } from '@lookup/classes/filters/role';

export interface ILookupRoleGetAllRequest {
  readonly filter: ILookupRoleGetAllFilter | undefined;
}