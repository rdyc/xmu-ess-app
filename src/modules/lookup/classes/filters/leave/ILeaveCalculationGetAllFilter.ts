import { IBaseFilter } from '@generic/interfaces';

export interface ILeaveCalculationGetAllFilter extends IBaseFilter {
  readonly companyUid: string;
  readonly year: string | undefined;
}