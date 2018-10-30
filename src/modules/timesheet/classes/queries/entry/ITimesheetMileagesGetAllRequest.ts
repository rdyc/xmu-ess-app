import { ITimesheetMileagesGetAllFilter } from '@timesheet/classes/filters';

export interface ITimesheetMileagesGetAllRequest {
  readonly filter: ITimesheetMileagesGetAllFilter | undefined ;
}