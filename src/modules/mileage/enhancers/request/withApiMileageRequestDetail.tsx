import { withUser, WithUser } from '@layout/hoc/withUser';
import { IMileageRequestGetByIdRequest } from '@mileage/classes/queries';
import withMileageRequestDetail from '@mileage/enhancers/request/withMileageRequestDetail';
import {
  mileagerequestGetByIdDispose,
  mileagerequestGetByIdRequest
} from '@mileage/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  compose,
  HandleCreators,
  lifecycle,
  ReactLifeCycleFunctions,
  setDisplayName,
  withHandlers
} from 'recompose';
import { Dispatch } from 'redux';

export interface WithApiMileageRequestDetailHandler {
  apiMileageRequestDetailGet: (mileageUid: string) => void;
}

interface Dispatcher {
  mileagerequestDetailDispatch: {
    getByIdRequest: typeof mileagerequestGetByIdRequest;
    getByIdDispose: typeof mileagerequestGetByIdDispose;
  };
}

type AllProps = WithApiMileageRequestDetailHandler & Dispatcher & WithUser;

const withApiMileageRequestDetail = (WrappedComponent: React.ComponentType) => {
  const displayName = `LoadDetailMileageRequest(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`;

  const withApiMileageRequestDetailWrapper: React.SFC<AllProps> = props => <WrappedComponent {...props} />;

  const handlerCreators: HandleCreators<
    AllProps,
    WithApiMileageRequestDetailHandler
  > = {
    apiMileageRequestDetailGet: (props: AllProps) => (mileageUid: string) => {
      const { user } = props.userState;
      const { getByIdRequest } = props.mileagerequestDetailDispatch;

      if (user) {
        getByIdRequest({
          mileageUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid
        });
      }
    }
  };

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    mileagerequestDetailDispatch: {
      getByIdRequest: (request: IMileageRequestGetByIdRequest) =>
        dispatch(mileagerequestGetByIdRequest(request)),
      getByIdDispose: () => dispatch(mileagerequestGetByIdDispose())
    }
  });

  const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, {}> = {
    componentWillUnmount() {
      const { getByIdDispose } = this.props.mileagerequestDetailDispatch;

      getByIdDispose();
    }
  };

  return compose<AllProps, {}>(
    setDisplayName(displayName),
    connect(
      undefined,
      mapDispatchToProps
    ),
    withUser,
    withMileageRequestDetail,
    withHandlers<AllProps, WithApiMileageRequestDetailHandler>(handlerCreators),
    lifecycle<AllProps, {}>(lifeCycleFunctions)
  )(withApiMileageRequestDetailWrapper);
};

export default withApiMileageRequestDetail;
