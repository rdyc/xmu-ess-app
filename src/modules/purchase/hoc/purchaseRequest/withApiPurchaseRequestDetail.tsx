import { withUser, WithUser } from '@layout/hoc/withUser';
import { IPurchaseGetByIdRequest, IPurchasePutRequest } from '@purchase/classes/queries/purchaseRequest';
import { IPurchasePutPayload } from '@purchase/classes/request/purchaseRequest';
import withPurchaseRequestDetail from '@purchase/hoc/purchaseRequest/withPurchaseRequestDetail';
import { purchaseGetByIdDispose, purchaseGetByIdRequest, purchasePutDispose, purchasePutRequest } from '@purchase/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, setDisplayName, withHandlers } from 'recompose';
import { Dispatch } from 'redux';

export interface WithApiPurchaseRequestDetailHandler {
  apiPurchaseRequestDetailGet: (purchaseUid: string) => void;
  apiPurchaseRequestDetailPut: (purchaseUid: string, payload: IPurchasePutPayload, resolve: any, reject: any) => void;
}

interface Dispatcher {
  purchaseDetailDispatch: {
    getByIdRequest: typeof purchaseGetByIdRequest;
    getByIdDispose: typeof purchaseGetByIdDispose;
    putRequest: typeof purchasePutRequest;
    putDispose: typeof purchasePutDispose;
  };
}

type AllProps 
  = WithApiPurchaseRequestDetailHandler
  & Dispatcher
  & WithUser;

const withApiPurchaseRequestDetail = (WrappedComponent: React.ComponentType) => { 
  const displayName = `LoadDetailPurchaseRequest(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withApiPurchaseRequestDetailWrapper: React.SFC<AllProps> = props => <WrappedComponent {...props} />;

  const handlerCreators: HandleCreators<AllProps, WithApiPurchaseRequestDetailHandler> = {
    apiPurchaseRequestDetailGet: (props: AllProps) => (purchaseUid: string) => { 
      const { user } = props.userState;
      const { getByIdRequest } = props.purchaseDetailDispatch;

      if (user) {
        getByIdRequest({
          purchaseUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
        }); 
      }
    },
    apiPurchaseRequestDetailPut: (props: AllProps) => (purchaseUid: string, payload: IPurchasePutPayload, resolve: any, reject: any) => { 
      const { user } = props.userState;
      const { putRequest } = props.purchaseDetailDispatch;

      if (user) {
        putRequest({
          resolve,
          reject,
          purchaseUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload
        });
      }      
    }
  };

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    purchaseDetailDispatch: {
      getByIdRequest: (request: IPurchaseGetByIdRequest) => dispatch(purchaseGetByIdRequest(request)),
      getByIdDispose: () => dispatch(purchaseGetByIdDispose()),
      putRequest: (request: IPurchasePutRequest) => dispatch(purchasePutRequest(request)),
      putDispose: () => dispatch(purchasePutDispose()),
    }
  });

  const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, {}> = {
    componentWillUnmount() {
      const { getByIdDispose, putDispose } = this.props.purchaseDetailDispatch;

      getByIdDispose();
      putDispose();
    }
  };

  return compose<AllProps, {}>(
    setDisplayName(displayName),    
    connect(undefined, mapDispatchToProps),
    withUser,
    withPurchaseRequestDetail,
    withHandlers<AllProps, WithApiPurchaseRequestDetailHandler>(handlerCreators),
    lifecycle<AllProps, {}>(lifeCycleFunctions),
  )(withApiPurchaseRequestDetailWrapper);
};

export default withApiPurchaseRequestDetail;