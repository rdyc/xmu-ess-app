import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { IPurchaseGetAllRequest } from '@purchase/classes/queries/purchaseRequest';
import { IPurchase } from '@purchase/classes/response/purchaseRequest';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  purchaseAllState: IQueryCollectionState<IPurchaseGetAllRequest, IPurchase>;
}

export type WithPurchaseRequestAll = PropsFromState;

const withPurchaseRequestAll = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithPurchaseRequestAll(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withPurchaseRequestAllWrapper: React.SFC<WithPurchaseRequestAll> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ purchaseGetAll }: IAppState) => ({
    purchaseAllState: purchaseGetAll
  });

  return compose<WithPurchaseRequestAll, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withPurchaseRequestAllWrapper);
};

export default withPurchaseRequestAll;