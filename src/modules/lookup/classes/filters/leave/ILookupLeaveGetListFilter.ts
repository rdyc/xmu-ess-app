import { IBaseFilter } from '@generic/interfaces';

export interface ILookupLeaveGetListFilter extends IBaseFilter {
  readonly companyUid?: string;
  readonly categoryType?: string | undefined;
}