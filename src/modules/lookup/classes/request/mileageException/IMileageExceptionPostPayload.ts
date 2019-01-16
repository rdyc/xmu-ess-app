export interface IMileageExceptionPostPayload {
  roleUid: string;
  percentage: number;
  projectUid?: string;
  siteType?: string;
  projectSiteUid?: string;
  description?: string;
  reason?: string;
  inactiveDate?: string;
}