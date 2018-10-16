import { IBaseFilter } from '@generic/interfaces';

export interface ILeaveListFilter extends IBaseFilter {
  readonly companyUid: string | undefined;
  readonly size: number | undefined;
}