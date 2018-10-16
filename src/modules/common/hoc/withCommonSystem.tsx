import { ISystemListRequest } from '@common/classes/queries';
import { ISystemList } from '@common/classes/response';
import {
  activityGetListRequest,
  currencyGetListRequest,
  documentGetListRequest,
  documentPresalesGetListRequest,
  projectGetListRequest,
  siteGetListRequest,
} from '@common/store/actions';
import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  // all

  // list
  commonActivityListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonCurrencyListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonDocumentListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonDocumentPresalesListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonProjectListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonSiteListState: IQueryCollectionState<ISystemListRequest, ISystemList>;

  // detail
}

interface PropsFromDispatch {
  commonDispatch: {
    // all

    // list
    activityListRequest: typeof activityGetListRequest;
    currencyListRequest: typeof currencyGetListRequest;
    documentListRequest: typeof documentGetListRequest;
    documentPresalesListRequest: typeof documentPresalesGetListRequest;
    projectListRequest: typeof projectGetListRequest;
    siteListRequest: typeof siteGetListRequest;

    // detail
  };
}

export interface WithCommonSystem extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ 
  commonActivityList, 
  commonCurrencyList, 
  commonDocumentList, 
  commonDocumentPresalesList, 
  commonProjectList,
  commonSiteList 
}: IAppState) => ({
  // all
  
  // list
  commonActivityListState: commonActivityList,
  commonCurrencyListState: commonCurrencyList,
  commonDocumentListState: commonDocumentList,
  commonDocumentPresalesListState: commonDocumentPresalesList,
  commonProjectListState: commonProjectList,
  commonSiteListState: commonSiteList,
  
  // detail
 
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  commonDispatch: {
    // all

    // list
    activityListRequest: (request: ISystemListRequest) => dispatch(activityGetListRequest(request)),
    currencyListRequest: (request: ISystemListRequest) => dispatch(currencyGetListRequest(request)),
    documentListRequest: (request: ISystemListRequest) => dispatch(documentGetListRequest(request)),
    documentPresalesListRequest: (request: ISystemListRequest) => dispatch(documentPresalesGetListRequest(request)),
    projectListRequest: (request: ISystemListRequest) => dispatch(projectGetListRequest(request)),
    siteListRequest: (request: ISystemListRequest) => dispatch(siteGetListRequest(request)),

    // detail
  }
});

export const withCommonSystem = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);