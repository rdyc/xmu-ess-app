import { IFinanceGetByIdRequest } from '@finance/classes/queries';
import { IFinanceDetail } from '@finance/classes/response';
import { IAppState, IQuerySingleState } from '@generic/interfaces';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  financeDetailState: IQuerySingleState<IFinanceGetByIdRequest, IFinanceDetail>;
}

export type WithFinanceDetail = PropsFromState;

const withFinanceDetail = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithFinanceDetail(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withFinanceDetailWrapper: React.SFC<WithFinanceDetail> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ financeGetById }: IAppState) => ({
    financeDetailState: financeGetById
  });

  return compose<WithFinanceDetail, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withFinanceDetailWrapper);
};

export default withFinanceDetail;