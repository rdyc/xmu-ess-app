import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList, ISystemType } from '@common/classes/response';
import {
  activityGetListRequest,
  currencyGetListRequest,
  destinationGetListRequest,
  documentGetListRequest,
  documentPresalesGetListRequest,
  expenseGetListRequest,
  leaveGetListRequest,
  projectGetListRequest,
  purposeGetListRequest,
  siteGetListRequest,
  statusGetListRequest,
  systemGetAllRequest,
  systemGetByIdRequest,
  systemGetTypeRequest,
  transportationGetListRequest,
} from '@common/store/actions';
import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  // system
  commonSystemState: {
    all: IQueryCollectionState<ISystemAllRequest, ISystem>;
    list: IQueryCollectionState<ISystemListRequest, ISystemList>;
    detail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;
    type: IQueryCollectionState<{}, ISystemType>;
  };

  // all

  // list
  commonActivityListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonCurrencyListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonDocumentListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonDocumentPresalesListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonProjectListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonSiteListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonLeaveListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonExpenseListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonStatusListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonDestinationListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonPurposeListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonTransportationListState: IQueryCollectionState<ISystemListRequest, ISystemList>;

  // detail
}

interface PropsFromDispatch {
  commonDispatch: {
    // all
    systemAllRequest: typeof systemGetAllRequest;

    // list
    activityListRequest: typeof activityGetListRequest;
    currencyListRequest: typeof currencyGetListRequest;
    documentListRequest: typeof documentGetListRequest;
    documentPresalesListRequest: typeof documentPresalesGetListRequest;
    expenseListRequest: typeof expenseGetListRequest;
    projectListRequest: typeof projectGetListRequest;
    siteListRequest: typeof siteGetListRequest;
    leaveListRequest: typeof leaveGetListRequest;
    statusListRequest: typeof statusGetListRequest;
    destinationListRequest: typeof destinationGetListRequest;
    purposeListRequest: typeof purposeGetListRequest;
    transportationListRequest: typeof transportationGetListRequest;

    // detail
    systemDetailRequest: typeof systemGetByIdRequest;

    // other
    systemTypeRequest: typeof systemGetTypeRequest;
  };
}

export interface WithCommonSystem extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ 
  commonActivityList, 
  commonCurrencyList, 
  commonDocumentList, 
  commonDocumentPresalesList, 
  commonProjectList,
  commonExpenseList,
  commonSiteList,
  commonLeaveList,
  commonStatusList,
  commonDestinationList,
  commonPurposeList,
  commonTransportationList,
  commonSystemAll,
  commonSystemList,
  commonSystemDetail,
  commonSystemType,

}: IAppState) => ({
  // system
  commonRequestState: {
    all: commonSystemAll,
    list: commonSystemList,
    detail: commonSystemDetail,
    type: commonSystemType,
  },

  // all
  
  // list
  commonActivityListState: commonActivityList,
  commonCurrencyListState: commonCurrencyList,
  commonDocumentListState: commonDocumentList,
  commonDocumentPresalesListState: commonDocumentPresalesList,
  commonProjectListState: commonProjectList,
  commonExpenseListState: commonExpenseList,
  commonSiteListState: commonSiteList,
  commonLeaveListState: commonLeaveList,
  commonStatusListState: commonStatusList,
  commonDestinationListState: commonDestinationList,
  commonPurposeListState: commonPurposeList,
  commonTransportationListState: commonTransportationList,
  
  // detail
 
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  commonDispatch: {
    // all
    systemListRequest: (request: ISystemAllRequest) => dispatch(systemGetAllRequest(request)),

    // list
    activityListRequest: (request: ISystemListRequest) => dispatch(activityGetListRequest(request)),
    currencyListRequest: (request: ISystemListRequest) => dispatch(currencyGetListRequest(request)),
    documentListRequest: (request: ISystemListRequest) => dispatch(documentGetListRequest(request)),
    documentPresalesListRequest: (request: ISystemListRequest) => dispatch(documentPresalesGetListRequest(request)),
    projectListRequest: (request: ISystemListRequest) => dispatch(projectGetListRequest(request)),
    expenseListRequest: (request: ISystemListRequest) => dispatch(expenseGetListRequest(request)),
    siteListRequest: (request: ISystemListRequest) => dispatch(siteGetListRequest(request)),
    leaveListRequest: (request: ISystemListRequest) => dispatch(leaveGetListRequest(request)),
    statusListRequest: (request: ISystemListRequest) => dispatch(statusGetListRequest(request)),
    destinationListRequest: (request: ISystemListRequest) => dispatch(destinationGetListRequest(request)),
    purposeListRequest: (request: ISystemListRequest) => dispatch(purposeGetListRequest(request)),
    transportationListRequest: (request: ISystemListRequest) => dispatch(transportationGetListRequest(request)),

    // detail
    systemDetailRequest: (request: ISystemByIdRequest) => dispatch(systemGetByIdRequest(request)),

    // type
    systemTypeRequest: () => dispatch(systemGetTypeRequest()),
  }
});

export const withCommonSystem = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);