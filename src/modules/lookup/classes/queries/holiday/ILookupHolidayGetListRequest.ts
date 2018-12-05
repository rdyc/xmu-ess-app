import { ILookupHolidayGetListFilter } from '@lookup/classes/filters';

export interface ILookupHolidayGetListRequest {
  readonly filter: ILookupHolidayGetListFilter | undefined;
}