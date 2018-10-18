import { IBaseFilter } from '@generic/interfaces';

export interface ILeaveListFilter extends IBaseFilter {
  readonly companyUid: string;
  readonly categoryType: string | undefined;
  readonly size: number | undefined;
}