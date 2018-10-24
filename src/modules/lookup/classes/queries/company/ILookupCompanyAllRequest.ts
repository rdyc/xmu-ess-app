import { ILookupCompanyAllFilter } from '@lookup/classes/filters/company';

export interface ILookupCompanyAllRequest {
  readonly filter: ILookupCompanyAllFilter | undefined;
}