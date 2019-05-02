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
  projectUid?: string;
  project?: ILookupProject;
  siteUid?: string;
  site?: ILookupProjectSite;
  siteType?: string;
  type?: ICommonSystem;
  percentage: number;
  description: string;
  reason: string;
  inactiveDate?: string;
  changes?: IBaseChanges;
}
