import { ICompanyAccess } from '@generic/interfaces';
import { ITimesheetGetAllFilter } from '@timesheet/classes/filters';

export interface ITimesheetGetAllRequest extends ICompanyAccess {
  readonly filter: ITimesheetGetAllFilter | undefined ;
}