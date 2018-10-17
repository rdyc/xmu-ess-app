import { withUser, WithUser } from '@layout/hoc/withUser';
import { ILeaveRequestGetByIdRequest, ILeaveRequestPutRequest } from '@leave/classes/queries';
import { ILeaveRequestPutPayload } from '@leave/classes/request';
import withLeaveRequestDetail from '@leave/enhancers/request/withLeaveRequestDetail';
import { leaveRequestGetByIdDispose, leaveRequestGetByIdRequest, leaveRequestPutDispose, leaveRequestPutRequest } from '@leave/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, setDisplayName, withHandlers } from 'recompose';
import { Dispatch } from 'redux';

export interface WithApiLeaveRequestDetailHandler {
  apiRequestDetailGet: (leaveRequestUid: string) => void;
  apiRequestDetailPut: (leaveRequestUid: string, payload: ILeaveRequestPutPayload, resolve: any, reject: any) => void;
}

interface Dispatcher {
  leaveRequestDetailDispatch: {
    getByIdRequest: typeof leaveRequestGetByIdRequest;
    getByIdDispose: typeof leaveRequestGetByIdDispose;
    putRequest: typeof leaveRequestPutRequest;
    putDispose: typeof leaveRequestPutDispose;
  };
}

type AllProps 
  = WithApiLeaveRequestDetailHandler
  & Dispatcher
  & WithUser;

const withApiLeaveRequestDetail = (WrappedComponent: React.ComponentType) => { 
  const displayName = `LoadDetailRequest(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withApiLeaveRequestDetailWrapper: React.SFC<AllProps> = props => <WrappedComponent {...props} />;

  const handlerCreators: HandleCreators<AllProps, WithApiLeaveRequestDetailHandler> = {
    apiRequestDetailGet: (props: AllProps) => (leaveRequestUid: string) => { 
      const { user } = props.userState;
      const { getByIdRequest } = props.leaveRequestDetailDispatch;

      if (user) {
        getByIdRequest({
          leaveRequestUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
        }); 
      }
    },
    apiRequestDetailPut: (props: AllProps) => (leaveRequestUid: string, payload: ILeaveRequestPutPayload, resolve: any, reject: any) => { 
      const { user } = props.userState;
      const { putRequest } = props.leaveRequestDetailDispatch;

      if (user) {
        putRequest({
          resolve,
          reject,
          leaveRequestUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload
        });
      }      
    }
  };

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    leaveRequestDetailDispatch: {
      getByIdRequest: (request: ILeaveRequestGetByIdRequest) => dispatch(leaveRequestGetByIdRequest(request)),
      getByIdDispose: () => dispatch(leaveRequestGetByIdDispose()),
      putRequest: (request: ILeaveRequestPutRequest) => dispatch(leaveRequestPutRequest(request)),
      putDispose: () => dispatch(leaveRequestPutDispose()),
    }
  });

  const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, {}> = {
    componentWillUnmount() {
      const { getByIdDispose, putDispose } = this.props.leaveRequestDetailDispatch;

      getByIdDispose();
      putDispose();
    }
  };

  return compose<AllProps, {}>(
    setDisplayName(displayName),    
    connect(undefined, mapDispatchToProps),
    withUser,
    withLeaveRequestDetail,
    withHandlers<AllProps, WithApiLeaveRequestDetailHandler>(handlerCreators),
    lifecycle<AllProps, {}>(lifeCycleFunctions),
  )(withApiLeaveRequestDetailWrapper);
};

export default withApiLeaveRequestDetail;