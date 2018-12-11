export interface IMileageExceptionPostPayload {
  roleUid: string;
  percentage: number;
  projectUid?: string | null;
  siteType?: string | null;
  projectSiteUid?: string | null;
  description?: string | null;
  reason?: string | null;
  inactiveDate?: string | null;
}