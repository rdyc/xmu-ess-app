import { ICommonSystem } from '@common/classes';
import { ILookupProject } from './ILookupProject';
import { ILookupProjectSite } from './ILookupProjectSite';
import { ILookupRole } from './ILookupRole';

export interface ILookupMileageException {
  uid: string;
  roleUid: string;
  role: ILookupRole;
  projectUid: string | null;
  project: ILookupProject | null;
  siteUid: string | null;
  site: ILookupProjectSite | null;
  siteType: string | null;
  type: ICommonSystem | null;
  percentage: number;
  description: string | null;
  reason: string | null;
  inactiveDate: string | null;
}