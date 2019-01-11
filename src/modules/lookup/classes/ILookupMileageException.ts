import { ICommonSystem } from '@common/classes';
import { ILookupProject } from './ILookupProject';
import { ILookupProjectSite } from './ILookupProjectSite';
import { ILookupRole } from './ILookupRole';

export interface ILookupMileageException {
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
  description?: string;
  reason?: string;
  inactiveDate?: string;
}