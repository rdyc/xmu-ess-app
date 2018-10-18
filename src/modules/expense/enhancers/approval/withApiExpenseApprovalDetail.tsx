import { IExpenseApprovalGetByIdRequest } from '@expense/classes/queries/request';
import withExpenseApprovalDetail from '@expense/enhancers/request/withExpenseDetail';
import { expenseApprovalGetByIdDispose, expenseApprovalGetByIdRequest } from '@expense/store/actions';
import { withUser, WithUser } from '@layout/hoc/withUser';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, setDisplayName, withHandlers } from 'recompose';
import { Dispatch } from 'redux';

export interface WithApiExpenseApprovalDetailHandler {
  apiApprovalDetailGet: (expenseUid: string) => void;
}

interface Dispatcher {
  expenseApprovalDetailDispatch: {
    getByIdApproval: typeof expenseApprovalGetByIdRequest;
    getByIdDispose: typeof expenseApprovalGetByIdDispose;
  };
}

type AllProps 
  = WithApiExpenseApprovalDetailHandler
  & Dispatcher
  & WithUser;

const withApiExpenseApprovalDetail = (WrappedComponent: React.ComponentType) => { 
  const displayName = `LoadDetailApproval(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withApiExpenseApprovalDetailWrapper: React.SFC<AllProps> = props => <WrappedComponent {...props} />;

  const handlerCreators: HandleCreators<AllProps, WithApiExpenseApprovalDetailHandler> = {
    apiApprovalDetailGet: (props: AllProps) => (expenseUid: string) => { 
      const { user } = props.userState;
      const { getByIdApproval } = props.expenseApprovalDetailDispatch;

      if (user) {
        getByIdApproval({
          expenseUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
        }); 
      }
    }
  };

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    expenseDetailDispatch: {
      getByIdApproval: (request: IExpenseApprovalGetByIdRequest) => dispatch(expenseApprovalGetByIdRequest(request)),
      getByIdDispose: () => dispatch(expenseApprovalGetByIdDispose()),
    }
  });

  const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, {}> = {
    componentWillUnmount() {
      const { getByIdDispose } = this.props.expenseApprovalDetailDispatch;

      getByIdDispose();
    }
  };

  return compose<AllProps, {}>(
    setDisplayName(displayName),    
    connect(undefined, mapDispatchToProps),
    withUser,
    withExpenseApprovalDetail,
    withHandlers<AllProps, WithApiExpenseApprovalDetailHandler>(handlerCreators),
    lifecycle<AllProps, {}>(lifeCycleFunctions),
  )(withApiExpenseApprovalDetailWrapper);
};

export default withApiExpenseApprovalDetail;