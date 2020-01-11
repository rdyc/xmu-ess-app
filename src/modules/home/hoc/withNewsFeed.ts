import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { INewsFeedGetListRequest, INewsFeedGetRequest } from '@home/classes/queries/newsFeed';
import { INews, INewsFeed } from '@home/classes/response/newsFeed';
import { newsFeedGetDispose, newsFeedGetListDispose, newsFeedGetListRequest, newsFeedGetRequest } from '@home/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  newsFeedState: {
    all: IQuerySingleState<INewsFeedGetRequest, INewsFeed>;
    list: IQueryCollectionState<INewsFeedGetListRequest, INews>;
  };
}

interface PropsFromDispatch {
  newsFeedDispatch: {
    // query
    loadRequest: typeof newsFeedGetRequest;
    loadDispose: typeof newsFeedGetDispose;
    
    loadListRequest: typeof newsFeedGetListRequest;
    loadListDispose: typeof newsFeedGetListDispose;
  };
}

export interface WithNewsFeed extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ newsFeedGet, newsFeedGetList }: IAppState) => ({
  newsFeedState: {
    all: newsFeedGet,
    list: newsFeedGetList
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  newsFeedDispatch: {
    // query
    loadRequest: (request: INewsFeedGetRequest) => dispatch(newsFeedGetRequest(request)),
    loadDispose: () => dispatch(newsFeedGetDispose()),
    
    loadListRequest: (request: INewsFeedGetListRequest) => dispatch(newsFeedGetListRequest(request)),
    loadListDispose: () => dispatch(newsFeedGetListDispose()),
  }
});

export const withNewsFeed = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);