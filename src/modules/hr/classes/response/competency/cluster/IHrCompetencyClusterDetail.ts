import { IBaseChanges } from '@generic/interfaces';

export interface IHrCompetencyClusterDetail {
  uid: string;
  name: string;
  description: string;
  changes?: IBaseChanges;
}