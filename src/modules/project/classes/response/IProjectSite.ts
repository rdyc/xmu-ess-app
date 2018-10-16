import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';

export interface IProjectSite {
  uid: string;
  name: string;
  value: number;
  siteType: string | null;
  type: ICommonSystem | null;
  changes: IBaseChanges | null;
}