import { IBaseCommand } from '@generic/interfaces';
import { ITimesheetPostPayload } from '@timesheet/classes/request';

export interface ITimesheetPostRequest extends IBaseCommand<ITimesheetPostPayload> {
  companyUid: string;
  positionUid: string;
}