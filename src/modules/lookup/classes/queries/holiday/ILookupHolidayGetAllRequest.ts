import { ILookupHolidayGetAllFilter } from '@lookup/classes/filters';

export interface ILookupHolidayGetAllRequest {
  readonly filter: ILookupHolidayGetAllFilter | undefined;
}