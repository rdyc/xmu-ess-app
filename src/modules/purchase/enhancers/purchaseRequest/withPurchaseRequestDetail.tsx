import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { IProjectGetByIdRequest } from '@project/classes/queries';
import { IProjectDetail } from '@project/classes/response';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  projectDetailState: IQuerySingleState<IProjectGetByIdRequest, IProjectDetail>;
}

export type WithPurchaseRequestDetail = PropsFromState;

const withPurchaseRequestDetail = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithPurchaseRequestDetail(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withPurchaseRequestDetailWrapper: React.SFC<WithPurchaseRequestDetail> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ projectGetById }: IAppState) => ({
    projectDetailState: projectGetById
  });

  return compose<WithPurchaseRequestDetail, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withPurchaseRequestDetailWrapper);
};

export default withPurchaseRequestDetail;