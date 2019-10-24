import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IWebJobDefinitionDeleteRequest, IWebJobDefinitionGetAllRequest, 
  IWebJobDefinitionGetDetailRequest, IWebJobDefinitionGetListRequest, 
  IWebJobDefinitionJobGetAllRequest, IWebJobDefinitionJobGetListRequest, 
  IWebJobDefinitionPostRequest,
} from '@webjob/classes/queries';
import { IWebJobDefinition, IWebJobDefinitionDetail, IWebJobDefinitionJob, IWebJobDefinitionJobList, IWebJobDefinitionList } from '@webjob/classes/response';
import { 
  webJobDefinitionDeleteDispose, webJobDefinitionDeleteRequest, 
  webJobDefinitionGetAllDispose, webJobDefinitionGetAllRequest, 
  webJobDefinitionGetByIdDispose, webJobDefinitionGetByIdRequest,
  webJobDefinitionGetListDispose, webJobDefinitionGetListRequest, 
  webJobDefinitionJobGetAllDispose, webJobDefinitionJobGetAllRequest,
  webJobDefinitionJobGetListDispose, webJobDefinitionJobGetListRequest, 
  webJobDefinitionPostDispose, webJobDefinitionPostRequest,
} from '@webjob/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  webJobDefinitionState: {
    all: IQueryCollectionState<IWebJobDefinitionGetAllRequest, IWebJobDefinition>;
    list: IQueryCollectionState<IWebJobDefinitionGetListRequest, IWebJobDefinitionList>;
    detail: IQuerySingleState<IWebJobDefinitionGetDetailRequest, IWebJobDefinitionDetail>;
    jobAll: IQueryCollectionState<IWebJobDefinitionJobGetAllRequest, IWebJobDefinitionJob>;
    jobList: IQueryCollectionState<IWebJobDefinitionJobGetListRequest, IWebJobDefinitionJobList>;
  };
}

interface PropsFromDispatch {
  webJobDefinitionDispatch: {
    // command
    createRequest: typeof webJobDefinitionPostRequest;
    createDispose: typeof webJobDefinitionPostDispose;
    deleteRequest: typeof webJobDefinitionDeleteRequest;
    deleteDispose: typeof webJobDefinitionDeleteDispose;

    // query
    loadAllRequest: typeof webJobDefinitionGetAllRequest;
    loadAllDispose: typeof webJobDefinitionGetAllDispose;
    loadListRequest: typeof webJobDefinitionGetListRequest;
    loadListDispose: typeof webJobDefinitionGetListDispose;
    jobloadAllRequest: typeof webJobDefinitionJobGetAllRequest;
    jobloadAllDispose: typeof webJobDefinitionJobGetAllDispose;
    jobloadListRequest: typeof webJobDefinitionJobGetListRequest;
    jobloadListDispose: typeof webJobDefinitionJobGetListDispose;
    loadDetailRequest: typeof webJobDefinitionGetByIdRequest;
    loadDetailDispose: typeof webJobDefinitionGetByIdDispose;
  };
}

export interface WithWebJobDefinition extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ webJobDefinitionGetAll, webJobDefinitionGetDetail, webJobDefinitionGetList, webJobDefinitionJobGetAll, webJobDefinitionJobGetList }: IAppState) => ({
  webJobDefinitionState: {
    all: webJobDefinitionGetAll,
    detail: webJobDefinitionGetDetail,
    list: webJobDefinitionGetList,
    jobAll: webJobDefinitionJobGetAll,
    jobList: webJobDefinitionJobGetList
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  webJobDefinitionDispatch: {
    // command
    createRequest: (request: IWebJobDefinitionPostRequest) => dispatch(webJobDefinitionPostRequest(request)),
    createDispose: () => dispatch(webJobDefinitionPostDispose()),
    deleteRequest: (request: IWebJobDefinitionDeleteRequest) => dispatch(webJobDefinitionDeleteRequest(request)),
    deleteDispose: () => dispatch(webJobDefinitionDeleteDispose()),

    // query
    loadAllRequest: (request: IWebJobDefinitionGetAllRequest) => dispatch(webJobDefinitionGetAllRequest(request)),
    loadAllDispose: () => dispatch(webJobDefinitionGetAllDispose()),
    loadListRequest: (request: IWebJobDefinitionGetListRequest) => dispatch(webJobDefinitionGetListRequest(request)),
    loadListDispose: () => dispatch(webJobDefinitionGetListDispose()),
    jobloadAllRequest: (request: IWebJobDefinitionJobGetAllRequest) => dispatch(webJobDefinitionJobGetAllRequest(request)),
    jobloadAllDispose: () => dispatch(webJobDefinitionJobGetAllDispose()),
    jobloadListRequest: (request: IWebJobDefinitionJobGetListRequest) => dispatch(webJobDefinitionJobGetListRequest(request)),
    jobloadListDispose: () => dispatch(webJobDefinitionJobGetListDispose()),
    loadDetailRequest: (request: IWebJobDefinitionGetDetailRequest) => dispatch(webJobDefinitionGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(webJobDefinitionGetByIdDispose()),
  }
});

export const withWebJobDefinition = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);