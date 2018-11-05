import { ISummaryBillableConsumed, ITimesheetSummaryBillableAssignment } from '@summary/classes/response/billable';

export interface ISummaryBillableCategory {
  name: string;
  billable: ISummaryBillableConsumed;
  assignments?: ITimesheetSummaryBillableAssignment[] | null;
}