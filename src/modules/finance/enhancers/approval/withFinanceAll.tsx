import { IFinanceGetAllRequest } from '@finance/classes/queries/approval';
import { IFinance } from '@finance/classes/response';
import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  financeAllState: IQueryCollectionState<IFinanceGetAllRequest, IFinance>;
}

export type WithFinanceAll = PropsFromState;

const withFinanceAll = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithFinanceAll(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withFinanceAllWrapper: React.SFC<WithFinanceAll> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ financeGetAll }: IAppState) => ({
    financeAllState: financeGetAll
  });

  return compose<WithFinanceAll, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withFinanceAllWrapper);
};

export default withFinanceAll;