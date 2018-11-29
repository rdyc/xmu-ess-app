import { ILookupCompanyGetAllFilter } from '@lookup/classes/filters/company';

export interface ILookupCompanyGetAllRequest {
  readonly filter: ILookupCompanyGetAllFilter | undefined;
}