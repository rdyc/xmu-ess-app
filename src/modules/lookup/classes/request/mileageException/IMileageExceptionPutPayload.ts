import { IBasePayload } from '@generic/interfaces';

export interface IMileageExceptionPutPayload extends IBasePayload {
  roleUid: string;
  projectUid?: string;
  siteType?: string;
  siteUid?: string;
  percentage: number;
  description: string;
  reason: string;
  inactiveDate?: string;
}