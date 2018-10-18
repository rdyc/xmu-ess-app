import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { IPurchaseGetByIdRequest } from '@purchase/classes/queries/purchaseRequest';
import { IPurchaseDetail } from '@purchase/classes/response/purchaseRequest';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  purchaseRequestDetailState: IQuerySingleState<IPurchaseGetByIdRequest, IPurchaseDetail>;
}

export type WithPurchaseRequestDetail = PropsFromState;

const withPurchaseRequestDetail = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithPurchaseRequestDetail(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withPurchaseRequestDetailWrapper: React.SFC<WithPurchaseRequestDetail> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ purchaseGetById }: IAppState) => ({
    purchaseRequestDetailState: purchaseGetById
  });

  return compose<WithPurchaseRequestDetail, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withPurchaseRequestDetailWrapper);
};

export default withPurchaseRequestDetail;