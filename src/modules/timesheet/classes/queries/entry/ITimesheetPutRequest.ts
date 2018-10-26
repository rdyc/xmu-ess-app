import { IBaseCommand } from '@generic/interfaces';
import { ITimesheetPutPayload } from '@timesheet/classes/request/entry';

export interface ITimesheetPutRequest extends IBaseCommand<ITimesheetPutPayload> {
  companyUid: string;
  positionUid: string;
  timesheetUid: string;
}