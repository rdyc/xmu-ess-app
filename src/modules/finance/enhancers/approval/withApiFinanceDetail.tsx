import { IFinanceGetByIdRequest } from '@finance/classes/queries';
import withFinanceDetail from '@finance/enhancers/approval/withFinanceDetail';
import { financeGetByIdDispose, financeGetByIdRequest } from '@finance/store/actions';
import { withUser, WithUser } from '@layout/hoc/withUser';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, setDisplayName, withHandlers } from 'recompose';
import { Dispatch } from 'redux';

export interface WithApiFinanceDetailHandler {
  apiRegistrationDetailGet: (financeUid: string) => void;
}

interface Dispatcher {
  financeDetailDispatch: {
    getByIdRequest: typeof financeGetByIdRequest;
    getByIdDispose: typeof financeGetByIdDispose;
  };
}

type AllProps 
  = WithApiFinanceDetailHandler
  & Dispatcher
  & WithUser;

const withApiFinanceDetail = (WrappedComponent: React.ComponentType) => { 
  const displayName = `LoadDetailApproval(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withApiFinanceDetailWrapper: React.SFC<AllProps> = props => <WrappedComponent {...props} />;

  const handlerCreators: HandleCreators<AllProps, WithApiFinanceDetailHandler> = {
    apiRegistrationDetailGet: (props: AllProps) => (financeUid: string) => { 
      const { user } = props.userState;
      const { getByIdRequest } = props.financeDetailDispatch;

      if (user) {
        getByIdRequest({
          financeUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
        }); 
      }
    },
  };

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    financeDetailDispatch: {
      getByIdRequest: (request: IFinanceGetByIdRequest) => dispatch(financeGetByIdRequest(request)),
      getByIdDispose: () => dispatch(financeGetByIdDispose())
    }
  });

  const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, {}> = {
    componentWillUnmount() {
      const { getByIdDispose } = this.props.financeDetailDispatch;

      getByIdDispose();
    }
  };

  return compose<AllProps, {}>(
    setDisplayName(displayName),    
    connect(undefined, mapDispatchToProps),
    withUser,
    withFinanceDetail,
    withHandlers<AllProps, WithApiFinanceDetailHandler>(handlerCreators),
    lifecycle<AllProps, {}>(lifeCycleFunctions),
  )(withApiFinanceDetailWrapper);
};

export default withApiFinanceDetail;