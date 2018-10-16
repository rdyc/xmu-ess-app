import { IExpenseGetAllRequest } from '@expense/classes/queries';
import { IExpense } from '@expense/classes/response';
import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  expenseAllState: IQueryCollectionState<IExpenseGetAllRequest, IExpense>;
}

export type WithExpenseAll = PropsFromState;

const withExpenseAll = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithExpenseAll(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withExpenseAllWrapper: React.SFC<WithExpenseAll> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ projectGetAll }: IAppState) => ({
    projectAllState: projectGetAll
  });

  return compose<WithExpenseAll, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withExpenseAllWrapper);
};

export default withExpenseAll;