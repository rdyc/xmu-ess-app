import { IBaseFilter } from '@generic/interfaces';

export interface IPositionGetListFilter extends IBaseFilter {
  readonly companyUid?: string | undefined;
  readonly orderBy?: string | undefined;
}