import { IBasePayload } from '@generic/interfaces';

export interface ITimesheetPostPayload extends IBasePayload {
  activityType: string;
  customerUid: string;
  projectUid: string;
  siteUid: string;
  date: string;
  start: string;
  end: string;
  description: string;
}