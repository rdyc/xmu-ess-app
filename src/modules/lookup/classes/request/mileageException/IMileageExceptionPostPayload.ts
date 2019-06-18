export interface IMileageExceptionPostPayload {
  roleUid: string;
  projectUid?: string;
  siteType?: string;
  siteUid?: string;
  percentage: number;
  description: string;
  reason: string;
  inactiveDate?: string;
}