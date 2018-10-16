import { IHolidayAllFilter } from '@lookup/classes/filters';

export interface IHolidayAllRequest {
  readonly filter: IHolidayAllFilter | undefined;
}