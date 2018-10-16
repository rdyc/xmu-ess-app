import { IHolidayListFilter } from '@lookup/classes/filters';

export interface IHolidayListRequest {
  readonly filter: IHolidayListFilter | undefined;
}