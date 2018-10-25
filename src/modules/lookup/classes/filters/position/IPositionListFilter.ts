import { IBaseFilter } from '@generic/interfaces';

export interface IPositionListFilter extends IBaseFilter {
  readonly companyUid: string | undefined;
  readonly orderBy: string | undefined;
  readonly direction: string | undefined;
}