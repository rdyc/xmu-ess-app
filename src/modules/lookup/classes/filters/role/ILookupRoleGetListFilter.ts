import { IBaseFilter } from '@generic/interfaces';

export interface ILookupRoleGetListFilter extends IBaseFilter {
  readonly companyUid: string | undefined;
}