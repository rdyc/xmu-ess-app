import withUser, { WithUser } from '@layout/hoc/withUser';
import { IProjectGetByIdRequest } from '@project/classes/queries';
import withDetailRegistration from '@project/hoc/registration/withDetailRegistration';
import { projectGetByIdDispose, projectGetByIdRequest } from '@project/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, setDisplayName, withHandlers } from 'recompose';
import { Dispatch } from 'redux';

export interface LoadDetailRegistrationHandler {
  handleReload: () => void;
}

interface RouteParams {
  projectUid: string;
}

interface Dispatcher {
  projectDetailDispatch: {
    getByIdRequest: typeof projectGetByIdRequest;
    getByIdDispose: typeof projectGetByIdDispose;
  };
}

type AllProps 
  = LoadDetailRegistrationHandler
  & Dispatcher
  & RouteComponentProps<RouteParams>
  & WithUser;

const loadDetailRegistration = (WrappedComponent: React.ComponentType) => { 
  const displayName = `LoadDetailRegistration(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const loadDetailRegistrationSFC: React.SFC<AllProps> = props => <WrappedComponent {...props} />;

  const handlerCreators: HandleCreators<AllProps, LoadDetailRegistrationHandler> = {
    handleReload: (props: AllProps) => () => { 
      loadData(props);
    }
  };

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    projectDetailDispatch: {
      getByIdRequest: (request: IProjectGetByIdRequest) => dispatch(projectGetByIdRequest(request)),
      getByIdDispose: () => dispatch(projectGetByIdDispose()),
    }
  });

  const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, {}> = {
    componentDidMount() {
      loadData(this.props);
    },
    componentWillUnmount() {
      const { getByIdDispose } = this.props.projectDetailDispatch;

      getByIdDispose();
    }
  };

  const loadData = (props: AllProps): void => {
    const { match } = props;
    const { user } = props.userState;
    const { getByIdRequest } = props.projectDetailDispatch;

    if (user) {
      getByIdRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        projectUid: match.params.projectUid
      }); 
    } 
  };

  return compose<AllProps, {}>(
    connect(undefined, mapDispatchToProps),
    
    withUser,
    withDetailRegistration,
    withRouter,
    withHandlers<AllProps, LoadDetailRegistrationHandler>(handlerCreators),
    
    lifecycle<AllProps, {}>(lifeCycleFunctions),
    
    setDisplayName(displayName),
  )(loadDetailRegistrationSFC);
};

export default loadDetailRegistration;