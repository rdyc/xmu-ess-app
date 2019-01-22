import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { INewsFeedGetRequest } from '@home/classes/queries/newsFeed';
import { INewsFeed } from '@home/classes/response/newsFeed';
import { newsFeedGetDispose, newsFeedGetRequest } from '@home/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  newsFeedState: {
    all: IQuerySingleState<INewsFeedGetRequest, INewsFeed>;
  };
}

interface PropsFromDispatch {
  newsFeedDispatch: {
    // query
    loadRequest: typeof newsFeedGetRequest;
    loadDispose: typeof newsFeedGetDispose;
  };
}

export interface WithNewsFeed extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ newsFeedGet }: IAppState) => ({
  newsFeedState: {
    all: newsFeedGet,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  newsFeedDispatch: {
    // query
    loadRequest: (request: INewsFeedGetRequest) => dispatch(newsFeedGetRequest(request)),
    loadDispose: () => dispatch(newsFeedGetDispose()),
  }
});

export const withNewsFeed = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);