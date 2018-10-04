import { IBaseChanges } from '@generic/interfaces';
import { ICommonSystem } from '@common/classes';

export interface IProjectSite {
  uid:      string;
  name:     string;
  value:    number;
  siteType: string | null;
  type:     ICommonSystem | null;
  changes:  IBaseChanges | null;
}