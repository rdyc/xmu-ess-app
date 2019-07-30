import { IBaseChanges } from '@generic/interfaces';
import { IHrCompetencyClusterList } from '../cluster/IHrCompetencyClusterList';

export interface IHrCompetencyCategoryDetail {
  uid: string;
  clusterUid: string;
  cluster: IHrCompetencyClusterList;
  name: string;
  description: string;
  changes?: IBaseChanges;  
}