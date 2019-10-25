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
  IHrCompetencyClusterGetAllRequest,
  IHrCompetencyClusterGetDetailRequest,
  IHrCompetencyClusterGetListRequest,
  IHrCompetencyClusterPatchRequest,
  IHrCompetencyClusterPostRequest,
  IHrCompetencyEmployeeGetAllRequest,
  IHrCompetencyEmployeeGetDetailListRequest,
  IHrCompetencyEmployeeGetDetailRequest,
  IHrCompetencyEmployeePatchRequest,
  IHrCompetencyMappedGetAllRequest,
  IHrCompetencyMappedGetDetailRequest,
  IHrCompetencyMappedGetListRequest,
  IHrCompetencyMappedGetNextRequest,
  IHrCompetencyMappedPostRequest,
  IHrCompetencyMappedPutRequest,
  IHrCornerBlogGetAllByCategoryRequest,
  IHrCornerBlogGetAllRequest,
  IHrCornerBlogGetDetailRequest,
  IHrCornerCategoryDeleteRequest,
  IHrCornerCategoryGetAllRequest,
  IHrCornerCategoryGetDetailRequest,
  IHrCornerCategoryGetListRequest,
  IHrCornerCategoryPostRequest,
  IHrCornerCategoryPutRequest,
  IHrCornerPageDeleteRequest,
  IHrCornerPageGetAllRequest,
  IHrCornerPageGetDetailRequest,
  IHrCornerPagePostRequest,
  IHrCornerPagePutRequest,
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
  IHrCompetencyMapped,
  IHrCompetencyMappedDetail,
  IHrCompetencyMappedList,
  IHrCompetencyMappedNext,
  IHrCornerBlog,
  IHrCornerBlogCategory,
  IHrCornerBlogDetail,
  IHrCornerCategory,
  IHrCornerCategoryDetail,
  IHrCornerCategoryList,
  IHrCornerPage,
  IHrCornerPageDetail,
} from '../response';

export interface IHrCompetencyState {
  // category
  hrCompetencyCategoryGetAll: IQueryCollectionState<IHrCompetencyCategoryGetAllRequest, IHrCompetencyCategory>;
  hrCompetencyCategoryGetList: IQueryCollectionState<IHrCompetencyCategoryGetListRequest, IHrCompetencyCategoryList>;
  hrCompetencyCategoryGetById: IQuerySingleState<IHrCompetencyCategoryGetDetailRequest, IHrCompetencyCategoryDetail>;
  hrCompetencyCategoryPost: IQuerySingleState<IHrCompetencyCategoryPostRequest, IHrCompetencyCategory>;
  hrCompetencyCategoryPatch: IQuerySingleState<IHrCompetencyCategoryPatchRequest, IHrCompetencyCategory>;
  
  // cluster
  hrCompetencyClusterGetAll: IQueryCollectionState<IHrCompetencyClusterGetAllRequest, IHrCompetencyCluster>;
  hrCompetencyClusterGetList: IQueryCollectionState<IHrCompetencyClusterGetListRequest, IHrCompetencyClusterList>;
  hrCompetencyClusterGetById: IQuerySingleState<IHrCompetencyClusterGetDetailRequest, IHrCompetencyClusterDetail>;
  hrCompetencyClusterPost: IQuerySingleState<IHrCompetencyClusterPostRequest, IHrCompetencyCluster>;
  hrCompetencyClusterPatch: IQuerySingleState<IHrCompetencyClusterPatchRequest, IHrCompetencyCluster>;

  // mapped
  hrCompetencyMappedGetAll: IQueryCollectionState<IHrCompetencyMappedGetAllRequest, IHrCompetencyMapped>;
  hrCompetencyMappedGetList: IQueryCollectionState<IHrCompetencyMappedGetListRequest, IHrCompetencyMappedList>;
  hrCompetencyMappedGetById: IQuerySingleState<IHrCompetencyMappedGetDetailRequest, IHrCompetencyMappedDetail>;
  hrCompetencyMappedGetNext: IQueryCollectionState<IHrCompetencyMappedGetNextRequest, IHrCompetencyMappedNext>;
  hrCompetencyMappedGetCurrent: IQueryCollectionState<IHrCompetencyMappedGetNextRequest, IHrCompetencyMappedNext>;
  hrCompetencyMappedPost: IQuerySingleState<IHrCompetencyMappedPostRequest, IHrCompetencyMapped>;
  hrCompetencyMappedPut: IQuerySingleState<IHrCompetencyMappedPutRequest, IHrCompetencyMapped>;
  
  // assessment
  hrCompetencyAssessmentGetAll: IQueryCollectionState<IHrCompetencyAssessmentGetAllRequest, IHrCompetencyAssessment>;
  hrCompetencyAssessmentGetById: IQuerySingleState<IHrCompetencyAssessmentGetDetailRequest, IHrCompetencyAssessmentDetail>;
  hrCompetencyAssessmentPost: IQuerySingleState<IHrCompetencyAssessmentPostRequest, IHrCompetencyAssessment>;
  hrCompetencyAssessmentPut: IQuerySingleState<IHrCompetencyAssessmentPutRequest, IHrCompetencyAssessment>;

  // employee
  hrCompetencyEmployeeGetAll: IQueryCollectionState<IHrCompetencyEmployeeGetAllRequest, IHrCompetencyEmployee>;
  hrCompetencyEmployeeGetDetailList: IQueryCollectionState<IHrCompetencyEmployeeGetDetailListRequest, IHrCompetencyEmployeeDetailList>;
  hrCompetencyEmployeeGetById: IQuerySingleState<IHrCompetencyEmployeeGetDetailRequest, IHrCompetencyEmployeeDetail>;
  hrCompetencyEmployeePatch: IQuerySingleState<IHrCompetencyEmployeePatchRequest, IHrCompetencyEmployee>;
  
  // result
  hrCompetencyResultGetAll: IQueryCollectionState<IHrCompetencyEmployeeGetAllRequest, IHrCompetencyEmployee>;
  hrCompetencyResultGetDetailList: IQueryCollectionState<IHrCompetencyEmployeeGetDetailListRequest, IHrCompetencyEmployeeDetailList>;
  hrCompetencyResultGetById: IQuerySingleState<IHrCompetencyEmployeeGetDetailRequest, IHrCompetencyEmployeeDetail>;
  hrCompetencyResultPatch: IQuerySingleState<IHrCompetencyEmployeePatchRequest, IHrCompetencyEmployee>;
  
  // corner blog
  hrCornerBlogGetAll: IQueryCollectionState<IHrCornerBlogGetAllRequest, IHrCornerBlog>;
  hrCornerBlogGetAllByCategory: IQueryCollectionState<IHrCornerBlogGetAllByCategoryRequest, IHrCornerBlogCategory>;
  hrCornerBlogGetLatestByCategory: IQueryCollectionState<IHrCornerBlogGetAllByCategoryRequest, IHrCornerBlogCategory>;
  hrCornerBlogGetDetail: IQuerySingleState<IHrCornerBlogGetDetailRequest, IHrCornerBlogDetail>;

  // corner category
  hrCornerCategoryGetAll: IQueryCollectionState<IHrCornerCategoryGetAllRequest, IHrCornerCategory>;
  hrCornerCategoryGetList: IQueryCollectionState<IHrCornerCategoryGetListRequest, IHrCornerCategoryList>;
  hrCornerCategoryGetDetail: IQuerySingleState<IHrCornerCategoryGetDetailRequest, IHrCornerCategoryDetail>;
  hrCornerCategoryPost: IQuerySingleState<IHrCornerCategoryPostRequest, IHrCornerCategory>;
  hrCornerCategoryPut: IQuerySingleState<IHrCornerCategoryPutRequest, IHrCornerCategory>;
  hrCornerCategoryDelete: IQuerySingleState<IHrCornerCategoryDeleteRequest, boolean>;

  // corner page
  hrCornerPageGetAll: IQueryCollectionState<IHrCornerPageGetAllRequest, IHrCornerPage>;
  hrCornerPageGetDetail: IQuerySingleState<IHrCornerPageGetDetailRequest, IHrCornerPageDetail>;
  hrCornerPagePost: IQuerySingleState<IHrCornerPagePostRequest, IHrCornerPage>;
  hrCornerPagePut: IQuerySingleState<IHrCornerPagePutRequest, IHrCornerPage>;
  hrCornerPageDelete: IQuerySingleState<IHrCornerPageDeleteRequest, boolean>;

}
