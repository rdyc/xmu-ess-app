import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupProject, ILookupProjectSite } from '@lookup/classes';
import { IRoleList } from '@lookup/classes/response';

export interface IMileageExceptionDetail {
  uid: string;
  roleUid: string;
  role: IRoleList;
  projectUid?: string | null;
  project?: ILookupProject | null;
  projectSiteUid?: string | null;
  projectSite?: ILookupProjectSite | null;
  siteType?: string | null;
  type?: ICommonSystem | null;
  percentage: number;
  description?: string | null;
  reason?: string | null;
  inactiveDate?: string | null;
  changes?: IBaseChanges | null;
}
