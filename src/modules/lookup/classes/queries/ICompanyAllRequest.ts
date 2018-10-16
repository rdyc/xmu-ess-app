import { ICompanyAllFilter } from '@lookup/classes/filters';

export interface ICompanyAllRequest {
  readonly filter: ICompanyAllFilter | undefined;
}