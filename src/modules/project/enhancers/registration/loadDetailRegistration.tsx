import withUser, { WithUser } from '@layout/hoc/withUser';
import { IProjectGetByIdRequest } from '@project/classes/queries';
import withDetailRegistration from '@project/enhancers/registration/withDetailRegistration';
import { projectGetByIdDispose, projectGetByIdRequest } from '@project/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, setDisplayName, withHandlers } from 'recompose';
import { Dispatch } from 'redux';

export interface LoadDetailRegistrationHandler {
  handleReload: (projectUid: string) => void;
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
  & WithUser;

const loadDetailRegistration = (WrappedComponent: React.ComponentType) => { 
  const displayName = `LoadDetailRegistration(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const loadDetailRegistrationSFC: React.SFC<AllProps> = props => <WrappedComponent {...props} />;

  const handlerCreators: HandleCreators<AllProps, LoadDetailRegistrationHandler> = {
    handleReload: (props: AllProps) => (projectUid: string) => { 
      loadData(props, projectUid);
    }
  };

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    projectDetailDispatch: {
      getByIdRequest: (request: IProjectGetByIdRequest) => dispatch(projectGetByIdRequest(request)),
      getByIdDispose: () => dispatch(projectGetByIdDispose()),
    }
  });

  const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, {}> = {
    componentWillUnmount() {
      const { getByIdDispose } = this.props.projectDetailDispatch;

      getByIdDispose();
    }
  };

  const loadData = (props: AllProps, uid: string): void => {
    const { user } = props.userState;
    const { getByIdRequest } = props.projectDetailDispatch;

    if (user) {
      getByIdRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        projectUid: uid
      }); 
    } 
  };

  return compose<AllProps, {}>(
    connect(undefined, mapDispatchToProps),
    
    withUser,
    withDetailRegistration,

    withHandlers<AllProps, LoadDetailRegistrationHandler>(handlerCreators),
    
    lifecycle<AllProps, {}>(lifeCycleFunctions),
    
    setDisplayName(displayName),
  )(loadDetailRegistrationSFC);
};

export default loadDetailRegistration;