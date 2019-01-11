import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';

export interface IProjectSite {
  uid: string;
  name: string;
  value: number;
  siteType?: string;
  type?: ICommonSystem;
  changes?: IBaseChanges;
}