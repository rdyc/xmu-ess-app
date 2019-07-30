import { IHrCompetencyClusterList } from '../cluster/IHrCompetencyClusterList';

export interface IHrCompetencyCategoryList {
  uid: string;
  clusterUid: string;
  cluster: IHrCompetencyClusterList;
  name: string;
  description: string;
}