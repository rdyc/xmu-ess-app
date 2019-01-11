import { IBaseFilter } from '@generic/interfaces';

export interface ILookupLeaveGetListFilter extends IBaseFilter {
  companyUid?: string;
  categoryType?: string;
}