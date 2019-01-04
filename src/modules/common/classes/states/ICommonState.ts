import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest, ISystemPostRequest, ISystemPutRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList, ISystemType } from '@common/classes/response';
import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';

export interface ICommonState {
  commonSystemAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonSystemList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonSystemDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;
  commonSystemType: IQueryCollectionState<{}, ISystemType>;
  commonSystemPost: IQuerySingleState<ISystemPostRequest, ISystem>;
  commonSystemPut: IQuerySingleState<ISystemPutRequest, ISystem>;

  commonUnitAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonUnitList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonUnitDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonActivityAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonActivityList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonActivityDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonCurrencyAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonCurrencyList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonCurrencyDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonDocumentAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonDocumentList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonDocumentDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonDocumentPresalesAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonDocumentPresalesList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonDocumentPresalesDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonProjectAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonProjectList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonProjectDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonSiteAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonSiteList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonSiteDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonExpenseAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonExpenseList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonExpenseDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonLeaveAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonLeaveList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonLeaveDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonStatusAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonStatusList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonStatusDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonDestinationAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonDestinationList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonDestinationDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonPurposeAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonPurposeList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonPurposeDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;
  
  commonTransportationAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonTransportationList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonTransportationDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonLimiterAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonLimiterList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonLimiterDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonGradeAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonGradeList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonGradeDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonRelationAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonRelationList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonRelationDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonReligionAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonReligionList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonReligionDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonGenderAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonGenderList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonGenderDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonBloodAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonBloodList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonBloodDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonTaxAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonTaxList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonTaxDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonEmploymentAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonEmploymentList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonEmploymentDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonPaymentAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonPaymentList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonPaymentDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonFinanceAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonFinanceList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonFinanceDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonTrainingAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonTrainingList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonTrainingDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonCertificationAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonCertificationList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonCertificationDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonFamilyAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonFamilyList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonFamilyDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonDegreeAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonDegreeList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonDegreeDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonDepartmentAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonDepartmentList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonDepartmentDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  commonLevelAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  commonLevelList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonLevelDetail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;
}