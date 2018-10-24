import { ILookupCompanyListFilter } from '@lookup/classes/filters/company';

export interface ILookupCompanyListRequest {
  readonly filter: ILookupCompanyListFilter | undefined;
}