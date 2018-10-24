import { WithUser, withUser } from '@layout/hoc/withUser';
import { ITravelGetByIdRequest, ITravelPutRequest } from '@travel/classes/queries';
import { ITravelPutPayload } from '@travel/classes/request';
import withTravelRequestDetail from '@travel/enhancers/request/withTravelRequestDetail';
import { travelGetByIdDispose, travelGetByIdRequest, travelPutDispose, travelPutRequest } from '@travel/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, setDisplayName, withHandlers } from 'recompose';
import { Dispatch } from 'redux';

export interface WithApiTravelRequestDetailHandler {
  apiRequestDetailGet: (travelUid: string) => void;
  apiRequestDetailPut: (travelUid: string, payload: ITravelPutPayload, resolve: any, reject: any) => void;
}

interface Dispatcher {
  travelDetailDispatch: {
    getByIdRequest: typeof travelGetByIdRequest;
    getByIdDispose: typeof travelGetByIdDispose;
    putRequest: typeof travelPutRequest;
    putDispose: typeof travelPutDispose;
  };
}

type AllProps
  = WithApiTravelRequestDetailHandler
  & Dispatcher
  & WithUser;

const withApiTravelRequestDetail = (WrappedComponent: React.ComponentType) => {
  const displayName = `LoadDetailRequest(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  const withApiTravelRequestDetailWrapper: React.SFC<AllProps> = props => <WrappedComponent {...props} />;

  const handlerCreators: HandleCreators<AllProps, WithApiTravelRequestDetailHandler> = {
    apiRequestDetailGet: (props: AllProps) => (travelUid: string) => {
      const { user } = props.userState;
      const { getByIdRequest } = props.travelDetailDispatch;

      if (user) {
        getByIdRequest({
          travelUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
        });
      }
    },
    apiRequestDetailPut: (props: AllProps) => (travelUid: string, payload: ITravelPutPayload, resolve: any, reject: any) => {
      const { user } = props.userState;
      const { putRequest } = props.travelDetailDispatch;

      if (user) {
        putRequest({
          resolve,
          reject,
          travelUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload
        });
      }
    }
  };

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    travelDetailDispatch: {
      getByIdRequest: (request: ITravelGetByIdRequest) => dispatch(travelGetByIdRequest(request)),
      getByIdDispose: () => dispatch(travelGetByIdDispose()),
      putRequest: (request: ITravelPutRequest) => dispatch(travelPutRequest(request)),
      putDispose: () => dispatch(travelPutDispose()),
    }
  });

  const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, {}> = {
    componentWillUnmount() {
      const { getByIdDispose, putDispose } = this.props.travelDetailDispatch;

      getByIdDispose();
      putDispose();
    }
  };

  return compose<AllProps, {}>(
    setDisplayName(displayName),
    connect(undefined, mapDispatchToProps),
    withUser,
    withTravelRequestDetail,
    withHandlers<AllProps, WithApiTravelRequestDetailHandler>(handlerCreators),
    lifecycle<AllProps, {}>(lifeCycleFunctions),
  )(withApiTravelRequestDetailWrapper);
};

export default withApiTravelRequestDetail;