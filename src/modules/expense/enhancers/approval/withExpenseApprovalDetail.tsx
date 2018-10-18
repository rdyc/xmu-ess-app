import { IExpenseApprovalGetByIdRequest } from '@expense/classes/queries';
import { IExpenseDetail } from '@expense/classes/response';
import { IAppState, IQuerySingleState } from '@generic/interfaces';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  expenseDetailState: IQuerySingleState<IExpenseApprovalGetByIdRequest, IExpenseDetail>;
}

export type WithExpenseApprovalDetail = PropsFromState;

const withExpenseApprovalDetail = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithExpenseDetail(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withExpenseApprovalDetailWrapper: React.SFC<WithExpenseApprovalDetail> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ expenseGetById }: IAppState) => ({
    expenseDetailState: expenseGetById
  });

  return compose<WithExpenseApprovalDetail, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withExpenseApprovalDetailWrapper);
};

export default withExpenseApprovalDetail;