import { withUser, WithUser } from '@layout/hoc/withUser';
import { ITimesheetGetByIdRequest, ITimesheetPutRequest } from '@timesheet/classes/queries';
import { ITimesheetPutPayload } from '@timesheet/classes/request';
import withTimesheetDetail from '@timesheet/enhancers/request/withTimesheetDetail';
import { timesheetGetByIdDispose, timesheetGetByIdRequest, timesheetPutDispose, timesheetPutRequest } from '@timesheet/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, setDisplayName, withHandlers } from 'recompose';
import { Dispatch } from 'redux';

export interface WithApiTimesheetDetailHandler {
  apiRequestDetailGet: (timesheetUid: string) => void;
  apiRequestDetailPut: (timesheetUid: string, payload: ITimesheetPutPayload, resolve: any, reject: any) => void;
}

interface Dispatcher {
  timesheetDetailDispatch: {
    getByIdRequest: typeof timesheetGetByIdRequest;
    getByIdDispose: typeof timesheetGetByIdDispose;
    putRequest: typeof timesheetPutRequest;
    putDispose: typeof timesheetPutDispose;
  };
}

type AllProps 
  = WithApiTimesheetDetailHandler
  & Dispatcher
  & WithUser;

const withApiTimesheetDetail = (WrappedComponent: React.ComponentType) => {
  const displayName = `LoadDetailRequest(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  const withApiTimesheetDetailWrapper: React.SFC<AllProps> = props => <WrappedComponent {...props} />;

  const handlerCreators: HandleCreators<AllProps, WithApiTimesheetDetailHandler> = {
    apiRequestDetailGet: (props: AllProps) => (timesheetUid: string) => { 
      const { user } = props.userState;
      const { getByIdRequest } = props.timesheetDetailDispatch;

      if (user) {
        getByIdRequest({
          timesheetUid
        }); 
      }
    },
    apiRequestDetailPut: (props: AllProps) => (timesheetUid: string, payload: ITimesheetPutPayload, resolve: any, reject: any) => { 
      const { user } = props.userState;
      const { putRequest } = props.timesheetDetailDispatch;

      if (user) {
        putRequest({
          resolve,
          reject,
          timesheetUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload
        });
      }      
    }
  };

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    timesheetDetailDispatch: {
      getByIdRequest: (request: ITimesheetGetByIdRequest) => dispatch(timesheetGetByIdRequest(request)),
      getByIdDispose: () => dispatch(timesheetGetByIdDispose()),
      putRequest: (request: ITimesheetPutRequest) => dispatch(timesheetPutRequest(request)),
      putDispose: () => dispatch(timesheetPutDispose()),
    }
  });

  const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, {}> = {
    componentWillUnmount() {
      const { getByIdDispose, putDispose } = this.props.timesheetDetailDispatch;

      getByIdDispose();
      putDispose();
    }
  };

  return compose<AllProps, {}>(
    setDisplayName(displayName),    
    connect(undefined, mapDispatchToProps),
    withUser,
    withTimesheetDetail,
    withHandlers<AllProps, WithApiTimesheetDetailHandler>(handlerCreators),
    lifecycle<AllProps, {}>(lifeCycleFunctions),
  )(withApiTimesheetDetailWrapper);
};

export default withApiTimesheetDetail;