import withUser, { WithUser } from '@layout/hoc/withUser';
import { IProjectGetByIdRequest, IProjectPutRequest } from '@project/classes/queries';
import { IProjectPutPayload } from '@project/classes/request';
import withProjectRegistrationDetail from '@project/enhancers/registration/withProjectRegistrationDetail';
import { projectGetByIdDispose, projectGetByIdRequest, projectPutDispose, projectPutRequest } from '@project/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, setDisplayName, withHandlers } from 'recompose';
import { Dispatch } from 'redux';

export interface WithApiProjectRegistrationDetailHandler {
  apiRegistrationDetailGet: (projectUid: string) => void;
  apiRegistrationDetailPut: (projectUid: string, payload: IProjectPutPayload, resolve: any, reject: any) => void;
}

interface Dispatcher {
  projectDetailDispatch: {
    getByIdRequest: typeof projectGetByIdRequest;
    getByIdDispose: typeof projectGetByIdDispose;
    putRequest: typeof projectPutRequest;
    putDispose: typeof projectPutDispose;
  };
}

type AllProps 
  = WithApiProjectRegistrationDetailHandler
  & Dispatcher
  & WithUser;

const withApiProjectRegistrationDetail = (WrappedComponent: React.ComponentType) => { 
  const displayName = `LoadDetailRegistration(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withApiProjectRegistrationDetailWrapper: React.SFC<AllProps> = props => <WrappedComponent {...props} />;

  const handlerCreators: HandleCreators<AllProps, WithApiProjectRegistrationDetailHandler> = {
    apiRegistrationDetailGet: (props: AllProps) => (projectUid: string) => { 
      const { user } = props.userState;
      const { getByIdRequest } = props.projectDetailDispatch;

      if (user) {
        getByIdRequest({
          projectUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
        }); 
      }
    },
    apiRegistrationDetailPut: (props: AllProps) => (projectUid: string, payload: IProjectPutPayload, resolve: any, reject: any) => { 
      const { user } = props.userState;
      const { putRequest } = props.projectDetailDispatch;

      if (user) {
        putRequest({
          resolve,
          reject,
          projectUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload
        });
      }      
    }
  };

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    projectDetailDispatch: {
      getByIdRequest: (request: IProjectGetByIdRequest) => dispatch(projectGetByIdRequest(request)),
      getByIdDispose: () => dispatch(projectGetByIdDispose()),
      putRequest: (request: IProjectPutRequest) => dispatch(projectPutRequest(request)),
      putDispose: () => dispatch(projectPutDispose()),
    }
  });

  const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, {}> = {
    componentWillUnmount() {
      const { getByIdDispose, putDispose } = this.props.projectDetailDispatch;

      getByIdDispose();
      putDispose();
    }
  };

  return compose<AllProps, {}>(
    setDisplayName(displayName),    
    connect(undefined, mapDispatchToProps),
    withUser,
    withProjectRegistrationDetail,
    withHandlers<AllProps, WithApiProjectRegistrationDetailHandler>(handlerCreators),
    lifecycle<AllProps, {}>(lifeCycleFunctions),
  )(withApiProjectRegistrationDetailWrapper);
};

export default withApiProjectRegistrationDetail;