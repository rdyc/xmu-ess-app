import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { ILandingPageGetAllRequest } from '@layout/classes/queries';
import { ILandingPage } from '@layout/classes/response';
import { landingPageGetAllDispose, landingPageGetAllRequest } from '@layout/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  landingPageState: {
    all: IQuerySingleState<ILandingPageGetAllRequest, ILandingPage>;
  };
}

interface PropsFromDispatch {
  landingPageDispatch: {
    // query
    loadAllRequest: typeof landingPageGetAllRequest;
    loadAllDispose: typeof landingPageGetAllDispose;
  };
}

export interface WithLandingPage extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ landingPageGetAll }: IAppState) => ({
  landingPageState: {
    all: landingPageGetAll,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  landingPageDispatch: {
    // query
    loadAllRequest: (request: ILandingPageGetAllRequest) => dispatch(landingPageGetAllRequest(request)),
    loadAllDispose: () => dispatch(landingPageGetAllDispose()),
  }
});

export const withLandingPage = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);