import { ICompanyListFilter } from '@lookup/classes/filters';

export interface ICompanyListRequest {
  readonly filter: ICompanyListFilter | undefined;
}