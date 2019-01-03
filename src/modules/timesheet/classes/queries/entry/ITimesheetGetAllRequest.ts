import { ICompanyAccess } from '@generic/interfaces';
import { ITimesheetEntryGetAllFilter } from '@timesheet/classes/filters';

export interface ITimesheetGetAllRequest extends ICompanyAccess {
  readonly filter: ITimesheetEntryGetAllFilter | undefined ;
}