import { IBaseFilter } from '@generic/interfaces';

export interface IHolidayListFilter extends IBaseFilter {
  readonly companyUid: string | undefined;
  readonly size: number | undefined;
}