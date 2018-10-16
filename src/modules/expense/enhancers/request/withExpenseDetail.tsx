import { IExpenseGetByIdRequest } from '@expense/classes/queries';
import { IExpenseDetail } from '@expense/classes/response';
import { IAppState, IQuerySingleState } from '@generic/interfaces';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  expenseDetailState: IQuerySingleState<IExpenseGetByIdRequest, IExpenseDetail>;
}

export type WithExpenseDetail = PropsFromState;

const withExpenseDetail = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithExpenseDetail(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withExpenseDetailWrapper: React.SFC<WithExpenseDetail> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ expenseGetById }: IAppState) => ({
    expenseDetailState: expenseGetById
  });

  return compose<WithExpenseDetail, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withExpenseDetailWrapper);
};

export default withExpenseDetail;