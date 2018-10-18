import { IExpenseApprovalGetAllRequest } from '@expense/classes/queries';
import { IExpense } from '@expense/classes/response';
import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  expenseApprovalAllState: IQueryCollectionState<IExpenseApprovalGetAllRequest, IExpense>;
}

export type WithExpenseApprovalAll = PropsFromState;

const withExpenseApprovalAll = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithExpenseAll(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withExpenseApprovalAllWrapper: React.SFC<WithExpenseApprovalAll> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ expenseApprovalGetAll }: IAppState) => ({
    expenseApprovalAllState: expenseApprovalGetAll
  });

  return compose<WithExpenseApprovalAll, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withExpenseApprovalAllWrapper);
};

export default withExpenseApprovalAll;