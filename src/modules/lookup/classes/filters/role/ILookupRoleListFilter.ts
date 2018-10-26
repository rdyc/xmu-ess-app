import { IBaseFilter } from '@generic/interfaces';

export interface ILookupRoleListFilter extends IBaseFilter {
  readonly companyUid: string | undefined;
}