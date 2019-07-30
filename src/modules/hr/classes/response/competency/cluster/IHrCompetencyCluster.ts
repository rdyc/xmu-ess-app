import { IBaseChanges } from '@generic/interfaces';

export interface IHrCompetencyCluster {
  uid: string;
  name: string;
  description: string;
  changes?: IBaseChanges;
}