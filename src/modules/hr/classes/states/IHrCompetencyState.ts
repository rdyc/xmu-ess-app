import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IHrCompetencyAssessmentGetAllRequest,
  IHrCompetencyAssessmentGetDetailRequest,
  IHrCompetencyAssessmentPostRequest,
  IHrCompetencyAssessmentPutRequest,
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
  IHrCompetencyEmployeeGetAllRequest,
  IHrCompetencyEmployeeGetDetailListRequest,
  IHrCompetencyEmployeeGetDetailRequest,
  IHrCompetencyEmployeeGetListRequest,
  IHrCompetencyEmployeePatchRequest,
  IHrCompetencyEmployeePostRequest,
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
  IHrCompetencyAssessment,
  IHrCompetencyAssessmentDetail,
  IHrCompetencyCategory,
  IHrCompetencyCategoryDetail,
  IHrCompetencyCategoryList,
  IHrCompetencyCluster,
  IHrCompetencyClusterDetail,
  IHrCompetencyClusterList,
  IHrCompetencyEmployee,
  IHrCompetencyEmployeeDetail,
  IHrCompetencyEmployeeDetailList,
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
import { IHrCompetencyEmployeeList } from '../response/competency/employee/IHrCompetencyEmployeeList';

export interface IHrCompetencyState {
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

  // assessment
  hrCompetencyAssessmentGetAll: IQueryCollectionState<IHrCompetencyAssessmentGetAllRequest, IHrCompetencyAssessment>;
  hrCompetencyAssessmentGetById: IQuerySingleState<IHrCompetencyAssessmentGetDetailRequest, IHrCompetencyAssessmentDetail>;
  hrCompetencyAssessmentPost: IQuerySingleState<IHrCompetencyAssessmentPostRequest, IHrCompetencyAssessment>;
  hrCompetencyAssessmentPut: IQuerySingleState<IHrCompetencyAssessmentPutRequest, IHrCompetencyAssessment>;

  // employee
  hrCompetencyEmployeeGetAll: IQueryCollectionState<IHrCompetencyEmployeeGetAllRequest, IHrCompetencyEmployee>;
  hrCompetencyEmployeeGetList: IQueryCollectionState<IHrCompetencyEmployeeGetListRequest, IHrCompetencyEmployeeList>;
  hrCompetencyEmployeeGetDetailList: IQueryCollectionState<IHrCompetencyEmployeeGetDetailListRequest, IHrCompetencyEmployeeDetailList>;
  hrCompetencyEmployeeGetById: IQuerySingleState<IHrCompetencyEmployeeGetDetailRequest, IHrCompetencyEmployeeDetail>;
  hrCompetencyEmployeePost: IQuerySingleState<IHrCompetencyEmployeePostRequest, IHrCompetencyEmployee>;
  hrCompetencyEmployeePatch: IQuerySingleState<IHrCompetencyEmployeePatchRequest, IHrCompetencyEmployee>;
  
  // result
  hrCompetencyResultGetAll: IQueryCollectionState<IHrCompetencyEmployeeGetAllRequest, IHrCompetencyEmployee>;
  hrCompetencyResultGetList: IQueryCollectionState<IHrCompetencyEmployeeGetListRequest, IHrCompetencyEmployeeList>;
  hrCompetencyResultGetDetailList: IQueryCollectionState<IHrCompetencyEmployeeGetDetailListRequest, IHrCompetencyEmployeeDetailList>;
  hrCompetencyResultGetById: IQuerySingleState<IHrCompetencyEmployeeGetDetailRequest, IHrCompetencyEmployeeDetail>;
  hrCompetencyResultPost: IQuerySingleState<IHrCompetencyEmployeePostRequest, IHrCompetencyEmployee>;
  hrCompetencyResultPatch: IQuerySingleState<IHrCompetencyEmployeePatchRequest, IHrCompetencyEmployee>;
  
}
