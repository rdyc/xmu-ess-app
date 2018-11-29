import { IBasePayload } from '@generic/interfaces';

export interface IMileageExceptionPostPayload extends IBasePayload {
  roleUid: string;
  percentage: number;
  projectUid?: string | null;
  siteType?: string | null;
  projectSiteUid?: string | null;
  description?: string | null;
  reason?: string | null;
  inactiveDate?: string | null;
}