import { ILookupRoleAllFilter } from '@lookup/classes/filters/role';

export interface ILookupRoleAllRequest {
  readonly filter: ILookupRoleAllFilter | undefined;
}