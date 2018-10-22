import { IBasePayload } from '@generic/interfaces';

export interface ITimesheetPutPayload extends IBasePayload {
  activityType: string;
  companyUid: string;
  positionUid: string;
  customerUid: string;
  projectUid: string;
  siteUid: string;
  date: string;
  start: string;
  end: string;
  notes: string;
}