import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { IProjectSiteGetRequest, IProjectSitePatchRequest } from '@project/classes/queries/site';
import { IProjectSite } from '@project/classes/response';
import {
  projectSiteGetDispose,
  projectSiteGetRequest,
  projectSitePatchDispose,
  projectSitePatchRequest,
} from '@project/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  projectSiteState: IQueryCollectionState<IProjectSiteGetRequest, IProjectSite>;
}

interface PropsFromDispatch {
  projectSiteDispatch: {
    // command
    patchRequest: typeof projectSitePatchRequest;
    patchDispose: typeof projectSitePatchDispose;

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
    patchRequest: (request: IProjectSitePatchRequest) => dispatch(projectSitePatchRequest(request)),
    patchDispose: () => dispatch(projectSitePatchDispose()),
    
    // query
    loadRequest: (request: IProjectSiteGetRequest) => dispatch(projectSiteGetRequest(request)),
    loadDispose: () => dispatch(projectSiteGetDispose())
  }
});

export const withProjectSite = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);