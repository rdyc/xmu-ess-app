import { IBaseFilter } from '@generic/interfaces';

export interface ILookupHolidayGetListFilter extends IBaseFilter {
  companyUid?: string;
  size?: number;
}