import { IBaseFilter } from '@generic/interfaces';

export interface IMileageExceptionListFilter extends IBaseFilter {
  companyUid?: string;
  size?: number;
}
