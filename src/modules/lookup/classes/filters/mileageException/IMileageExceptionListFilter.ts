import { IBaseFilter } from '@generic/interfaces';

export interface IMileageExceptionListFilter extends IBaseFilter {
  readonly companyUid?: string | undefined;
  readonly size?: number | undefined;
}
