import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import {
  ILookupProject,
  ILookupProjectSite,
  ILookupRole
} from '@lookup/classes';

export interface IMileageExceptionDetail {
  uid: string;
  roleUid: string;
  role: ILookupRole;
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
