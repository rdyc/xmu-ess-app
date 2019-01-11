import { IBaseFilter } from '@generic/interfaces';

export interface IPositionGetListFilter extends IBaseFilter {
  companyUid?: string;
  orderBy?: string;
}