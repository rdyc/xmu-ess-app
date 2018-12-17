import { IBasePagingFilter } from '@generic/interfaces';

export interface ILookupRoleGetAllFilter extends IBasePagingFilter {
  companyUid?: string | undefined;
}