import { ICompanyAccess } from '@generic/interfaces';

export interface ITimesheetApprovalGetByIdRequest extends ICompanyAccess {
  readonly timesheetUid: string | undefined;
}