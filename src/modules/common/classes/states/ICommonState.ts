import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';

export interface ICommonState {
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
}