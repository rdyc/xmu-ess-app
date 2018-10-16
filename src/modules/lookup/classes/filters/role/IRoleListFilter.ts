import { IBaseFilter } from '@generic/interfaces';

export interface IRoleListFilter extends IBaseFilter {
  readonly companyUid: string | undefined;
}