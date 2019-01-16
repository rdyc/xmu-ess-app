import { IBasePayload } from '@generic/interfaces';

export interface IMileageExceptionPutPayload extends IBasePayload {
  roleUid: string;
  percentage: number;
  projectUid?: string;
  siteType?: string;
  projectSiteUid?: string;
  description?: string;
  reason?: string;
  inactiveDate?: string;
}