import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IHrCompetencyCategoryGetAllRequest,
  IHrCompetencyCategoryGetDetailRequest,
  IHrCompetencyCategoryGetListRequest,
  IHrCompetencyCategoryPatchRequest,
  IHrCompetencyCategoryPostRequest,
  IHrCompetencyCategoryPutRequest,
  IHrCompetencyClusterGetAllRequest,
  IHrCompetencyClusterGetDetailRequest,
  IHrCompetencyClusterGetListRequest,
  IHrCompetencyClusterPatchRequest,
  IHrCompetencyClusterPostRequest,
  IHrCompetencyClusterPutRequest,
  IHrCompetencyIndicatorGetAllRequest,
  IHrCompetencyIndicatorGetDetailRequest,
  IHrCompetencyIndicatorGetListRequest,
  IHrCompetencyIndicatorPostRequest,
  IHrCompetencyIndicatorPutRequest,
  IHrCompetencyLevelGetAllRequest,
  IHrCompetencyLevelGetDetailRequest,
  IHrCompetencyLevelGetListRequest,
  IHrCompetencyLevelPostRequest,
  IHrCompetencyLevelPutRequest,
  IHrCompetencyMappedGetAllRequest,
  IHrCompetencyMappedGetDetailRequest,
  IHrCompetencyMappedGetListRequest,
  IHrCompetencyMappedPostRequest,
  IHrCompetencyMappedPutRequest,
} from '../queries';
import {
  IHrCompetencyCategory,
  IHrCompetencyCategoryDetail,
  IHrCompetencyCategoryList,
  IHrCompetencyCluster,
  IHrCompetencyClusterDetail,
  IHrCompetencyClusterList,
  IHrCompetencyIndicator,
  IHrCompetencyIndicatorDetail,
  IHrCompetencyIndicatorList,
  IHrCompetencyLevel,
  IHrCompetencyLevelDetail,
  IHrCompetencyLevelList,
  IHrCompetencyMapped,
  IHrCompetencyMappedDetail,
  IHrCompetencyMappedList,
} from '../response';

export interface IHrState {
  // category
  hrCompetencyCategoryGetAll: IQueryCollectionState<IHrCompetencyCategoryGetAllRequest, IHrCompetencyCategory>;
  hrCompetencyCategoryGetList: IQueryCollectionState<IHrCompetencyCategoryGetListRequest, IHrCompetencyCategoryList>;
  hrCompetencyCategoryGetById: IQuerySingleState<IHrCompetencyCategoryGetDetailRequest, IHrCompetencyCategoryDetail>;
  hrCompetencyCategoryPost: IQuerySingleState<IHrCompetencyCategoryPostRequest, IHrCompetencyCategory>;
  hrCompetencyCategoryPut: IQuerySingleState<IHrCompetencyCategoryPutRequest, IHrCompetencyCategory>;
  hrCompetencyCategoryPatch: IQuerySingleState<IHrCompetencyCategoryPatchRequest, IHrCompetencyCategory>;
  
  // cluster
  hrCompetencyClusterGetAll: IQueryCollectionState<IHrCompetencyClusterGetAllRequest, IHrCompetencyCluster>;
  hrCompetencyClusterGetList: IQueryCollectionState<IHrCompetencyClusterGetListRequest, IHrCompetencyClusterList>;
  hrCompetencyClusterGetById: IQuerySingleState<IHrCompetencyClusterGetDetailRequest, IHrCompetencyClusterDetail>;
  hrCompetencyClusterPost: IQuerySingleState<IHrCompetencyClusterPostRequest, IHrCompetencyCluster>;
  hrCompetencyClusterPut: IQuerySingleState<IHrCompetencyClusterPutRequest, IHrCompetencyCluster>;
  hrCompetencyClusterPatch: IQuerySingleState<IHrCompetencyClusterPatchRequest, IHrCompetencyCluster>;
  
  // level
  hrCompetencyLevelGetAll: IQueryCollectionState<IHrCompetencyLevelGetAllRequest, IHrCompetencyLevel>;
  hrCompetencyLevelGetList: IQueryCollectionState<IHrCompetencyLevelGetListRequest, IHrCompetencyLevelList>;
  hrCompetencyLevelGetById: IQuerySingleState<IHrCompetencyLevelGetDetailRequest, IHrCompetencyLevelDetail>;
  hrCompetencyLevelPost: IQuerySingleState<IHrCompetencyLevelPostRequest, IHrCompetencyLevel>;
  hrCompetencyLevelPut: IQuerySingleState<IHrCompetencyLevelPutRequest, IHrCompetencyLevel>;

  // indicator
  hrCompetencyIndicatorGetAll: IQueryCollectionState<IHrCompetencyIndicatorGetAllRequest, IHrCompetencyIndicator>;
  hrCompetencyIndicatorGetList: IQueryCollectionState<IHrCompetencyIndicatorGetListRequest, IHrCompetencyIndicatorList>;
  hrCompetencyIndicatorGetById: IQuerySingleState<IHrCompetencyIndicatorGetDetailRequest, IHrCompetencyIndicatorDetail>;
  hrCompetencyIndicatorPost: IQuerySingleState<IHrCompetencyIndicatorPostRequest, IHrCompetencyIndicator>;
  hrCompetencyIndicatorPut: IQuerySingleState<IHrCompetencyIndicatorPutRequest, IHrCompetencyIndicator>;

  // mapped
  hrCompetencyMappedGetAll: IQueryCollectionState<IHrCompetencyMappedGetAllRequest, IHrCompetencyMapped>;
  hrCompetencyMappedGetList: IQueryCollectionState<IHrCompetencyMappedGetListRequest, IHrCompetencyMappedList>;
  hrCompetencyMappedGetById: IQuerySingleState<IHrCompetencyMappedGetDetailRequest, IHrCompetencyMappedDetail>;
  hrCompetencyMappedPost: IQuerySingleState<IHrCompetencyMappedPostRequest, IHrCompetencyMapped>;
  hrCompetencyMappedPut: IQuerySingleState<IHrCompetencyMappedPutRequest, IHrCompetencyMapped>;
}
