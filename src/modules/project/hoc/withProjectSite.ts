import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { IProjectSiteGetRequest, IProjectSitePostRequest, IProjectSitePutRequest } from '@project/classes/queries/site';
import { IProjectSite } from '@project/classes/response';
import {
  projectSiteDeleteDispose,
  projectSiteDeleteRequest,
  projectSiteGetDispose,
  projectSiteGetRequest,
  projectSitePostDispose,
  projectSitePostRequest,
  projectSitePutDispose,
  projectSitePutRequest,
} from '@project/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  projectSiteState: IQueryCollectionState<IProjectSiteGetRequest, IProjectSite>;
}

interface PropsFromDispatch {
  projectSiteDispatch: {
    // command
    createRequest: typeof projectSitePostRequest;
    createDispose: typeof projectSitePostDispose;
    updateRequest: typeof projectSitePutRequest;
    updateDispose: typeof projectSitePutDispose;
    deleteRequest: typeof projectSiteDeleteRequest;
    deleteDispose: typeof projectSiteDeleteDispose;

    // query
    loadRequest: typeof projectSiteGetRequest;
    loadDispose: typeof projectSiteGetDispose;
  };
}

export interface WithProjectSite extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ projectSiteGet }: IAppState) => ({
  projectSiteState: projectSiteGet
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  projectSiteDispatch: {
    // command
    createRequest: (request: IProjectSitePostRequest) => dispatch(projectSitePostRequest(request)),
    createDispose: () => dispatch(projectSitePostDispose()),
    updateRequest: (request: IProjectSitePutRequest) => dispatch(projectSitePutRequest(request)),
    updateDispose: () => dispatch(projectSitePutDispose()),
    deleteRequest: (request: IProjectSitePutRequest) => dispatch(projectSiteDeleteRequest(request)),
    deleteDispose: () => dispatch(projectSiteDeleteDispose()),
    
    // query
    loadRequest: (request: IProjectSiteGetRequest) => dispatch(projectSiteGetRequest(request)),
    loadDispose: () => dispatch(projectSiteGetDispose())
  }
});

export const withProjectSite = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);