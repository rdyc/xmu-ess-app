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
}