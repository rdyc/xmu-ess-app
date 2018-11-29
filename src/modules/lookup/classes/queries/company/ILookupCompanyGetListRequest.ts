import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';

export interface ILookupCompanyGetListRequest {
  readonly filter: ILookupCompanyGetListFilter | undefined;
}