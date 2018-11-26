import { IBaseFilter } from '@generic/interfaces';

export interface ILookupHolidayGetListFilter extends IBaseFilter {
  readonly companyUid: string | undefined;
  readonly size: number | undefined;
}