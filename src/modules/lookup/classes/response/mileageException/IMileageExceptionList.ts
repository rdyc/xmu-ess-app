import { ICommonSystem } from '@common/classes';
import { ILookupProject, ILookupProjectSite } from '@lookup/classes';
import { IRoleList } from '@lookup/classes/response';
export interface IMileageExceptionList {
  uid: string;
  roleUid: string;
  role: IRoleList;
  projectUid?: string;
  project?: ILookupProject;
  projectSiteUid?: string;
  projectSite?: ILookupProjectSite;
  siteType?: string;
  type?: ICommonSystem;
  percentage: number;
  description?: string;
  reason?: string;
  inactiveDate?: string;
}
