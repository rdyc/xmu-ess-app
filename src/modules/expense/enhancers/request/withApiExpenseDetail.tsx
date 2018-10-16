import { IExpenseGetByIdRequest, IExpensePutRequest } from '@expense/classes/queries';
import { IExpensePutPayload } from '@expense/classes/request';
import withExpenseDetail from '@expense/enhancers/request/withExpenseDetail';
import { expenseGetByIdDispose, expenseGetByIdRequest, expensePutDispose, expensePutRequest } from '@expense/store/actions';
import { withUser, WithUser } from '@layout/hoc/withUser';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, setDisplayName, withHandlers } from 'recompose';
import { Dispatch } from 'redux';

export interface WithApiExpenseDetailHandler {
  apiRequestDetailGet: (expenseUid: string) => void;
  apiRequestDetailPut: (expenseUid: string, payload: IExpensePutPayload, resolve: any, reject: any) => void;
}

interface Dispatcher {
  expenseDetailDispatch: {
    getByIdRequest: typeof expenseGetByIdRequest;
    getByIdDispose: typeof expenseGetByIdDispose;
    putRequest: typeof expensePutRequest;
    putDispose: typeof expensePutDispose;
  };
}

type AllProps 
  = WithApiExpenseDetailHandler
  & Dispatcher
  & WithUser;

const withApiExpenseDetail = (WrappedComponent: React.ComponentType) => { 
  const displayName = `LoadDetailRequest(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withApiExpenseDetailWrapper: React.SFC<AllProps> = props => <WrappedComponent {...props} />;

  const handlerCreators: HandleCreators<AllProps, WithApiExpenseDetailHandler> = {
    apiRequestDetailGet: (props: AllProps) => (expenseUid: string) => { 
      const { user } = props.userState;
      const { getByIdRequest } = props.expenseDetailDispatch;

      if (user) {
        getByIdRequest({
          expenseUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
        }); 
      }
    },
    apiRequestDetailPut: (props: AllProps) => (expenseUid: string, payload: IExpensePutPayload, resolve: any, reject: any) => { 
      const { user } = props.userState;
      const { putRequest } = props.expenseDetailDispatch;

      if (user) {
        putRequest({
          resolve,
          reject,
          expenseUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload
        });
      }      
    }
  };

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    expenseDetailDispatch: {
      getByIdRequest: (request: IExpenseGetByIdRequest) => dispatch(expenseGetByIdRequest(request)),
      getByIdDispose: () => dispatch(expenseGetByIdDispose()),
      putRequest: (request: IExpensePutRequest) => dispatch(expensePutRequest(request)),
      putDispose: () => dispatch(expensePutDispose()),
    }
  });

  const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, {}> = {
    componentWillUnmount() {
      const { getByIdDispose, putDispose } = this.props.expenseDetailDispatch;

      getByIdDispose();
      putDispose();
    }
  };

  return compose<AllProps, {}>(
    setDisplayName(displayName),    
    connect(undefined, mapDispatchToProps),
    withUser,
    withExpenseDetail,
    withHandlers<AllProps, WithApiExpenseDetailHandler>(handlerCreators),
    lifecycle<AllProps, {}>(lifeCycleFunctions),
  )(withApiExpenseDetailWrapper);
};

export default withApiExpenseDetail;