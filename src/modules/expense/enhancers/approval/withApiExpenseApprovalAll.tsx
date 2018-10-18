import AppMenu from '@constants/AppMenu';
import { IExpenseApprovalGetAllRequest } from '@expense/classes/queries/request';
import withExpenseApprovalAll, { WithExpenseApprovalAll } from '@expense/enhancers/approval/withExpenseApprovalAll';
import { expenseApprovalGetAllDispose, expenseApprovalGetAllRequest } from '@expense/store/actions';
import { SortDirection } from '@generic/types';
import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { withUser, WithUser } from '@layout/hoc/withUser';
import { IListBarField } from '@layout/interfaces';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';

export interface WithApiExpenseApprovalAllHandler {
  handleSync: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleSize: (value: number) => void;
  handleOrder: (field: IListBarField) => void;
  handleSort: (direction: SortDirection) => void;
}

interface WithApiExpenseApprovalAllOptions {
  orderBy?: string | undefined;
  direction?: string | undefined;
  page?: number | undefined;
  size?: number | undefined;
}

interface State {
  orderBy: string | undefined;
  direction: string | undefined;
  page: number;
  size: number;
}

interface Updaters extends StateHandlerMap<State> {
  onNext: StateHandler<State>;
  onPrev: StateHandler<State>;
  onSync: StateHandler<State>;
  onOrder: StateHandler<State>;
  onSort: StateHandler<State>;
  onSize: StateHandler<State>;
}

interface Dispatcher {
  expenseAllDispatch: {
    getAllRequest: typeof expenseApprovalGetAllRequest;
    getAllDispose: typeof expenseApprovalGetAllDispose;
  };
}

type AllProps 
  = WithApiExpenseApprovalAllHandler
  & Dispatcher
  & State
  & Updaters
  & WithUser
  & WithLayout
  & WithExpenseApprovalAll;

const withApiExpenseApprovalAll = (options?: WithApiExpenseApprovalAllOptions) => (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithApiExpenseAll(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withApiExpenseAllWrapper: React.SFC<AllProps> = props => <WrappedComponent {...props} />;

  const createProps: mapper<AllProps, State> = (props: AllProps): State => {
    const { request } = props.expenseApprovalAllState;

    return { 
      orderBy: request && request.filter && request.filter['query.orderBy'] || options && options.orderBy,
      direction: request && request.filter && request.filter['query.direction'] || options && options.direction,
      page: request && request.filter && request.filter['query.page'] || options && options.page || 1, 
      size: request && request.filter && request.filter['query.size'] || options && options.size || 10,
    };
  };

  const stateUpdaters: StateUpdaters<WithApiExpenseApprovalAllOptions, State, Updaters> = {
    onNext: (prevState: State) => () => ({
      page: prevState.page + 1,
    }),
    onPrev: (prevState: State) => () => ({
      page: prevState.page - 1,
    }),
    onSync: (prevState: State) => () => ({
      page: 1,
    }),
    onOrder: (prevState: State) => (field: IListBarField) => ({
      orderBy: field.id,
      page: 1,
    }),
    onSort: (prevState: State) => (direction: SortDirection) => ({
      direction,
      page: 1,
    }),
    onSize: (prevState: State) => (size: number) => ({
      size,
      page: 1,
    }),
  };

  const handlerCreators: HandleCreators<AllProps, WithApiExpenseApprovalAllHandler> = {
    handleSync: (props: AllProps) => () => { 
      props.onSync();

      // force re-load from api
      loadData(props);
    },
    handleNext: (props: AllProps) => () => { 
      props.onNext();
    },
    handlePrev: (props: AllProps) => () => { 
      props.onPrev();
    },
    handleOrder: (props: AllProps) => (field: IListBarField) => { 
      props.onOrder(field);
    },
    handleSize: (props: AllProps) => (value: number) => { 
      props.onSize(value);
    },
    handleSort: (props: AllProps) => (direction: SortDirection) => { 
      props.onSort(direction);
    }
  };

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    expenseAllDispatch: {
      getAllApproval: (request: IExpenseApprovalGetAllRequest) => dispatch(expenseApprovalGetAllRequest(request)),
      getAllDispose: () => dispatch(expenseApprovalGetAllDispose()),
    }
  });

  const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, {}> = {
    componentDidMount() {
      const { response } = this.props.expenseApprovalAllState;
      
      // only load data when response are empty
      if (!response) {
        loadData(this.props);
      }
    },
    componentDidUpdate(props: AllProps, state: State) {
      // only load when these props are different
      if (
        this.props.orderBy !== props.orderBy ||
        this.props.direction !== props.direction ||
        this.props.page !== props.page ||
        this.props.size !== props.size
      ) {
        loadData(this.props);
      }
    },
    componentWillUnmount() {
      const { view } = this.props.layoutState;
      const { getAllDispose } = this.props.expenseAllDispatch;

      // dispose 'get all' from 'redux store' when the page is 'out of expense' context 
      if (view && view.parentUid !== AppMenu.Expense) {
        getAllDispose();
      }
    }
  };

  const loadData = (props: AllProps): void => {
    const { orderBy, direction, page, size } = props;
    const { user } = props.userState;
    const { getAllRequest } = props.expenseAllDispatch;
    const { alertAdd } = props.layoutDispatch;

    if (user) {
      getAllRequest({
        filter: {
          'query.direction': direction,
          'query.orderBy': orderBy,
          'query.page': page,
          'query.size': size,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          start: undefined,
          end: undefined,
          status: undefined,
          isNotify: undefined,
          'query.find': undefined,
          'query.findBy': undefined,
        }
      }); 
    } else {
      alertAdd({
        time: new Date(),
        message: 'Unable to find current user state'
      });
    }
  };

  return compose<AllProps, WithApiExpenseApprovalAllOptions>(
    setDisplayName(displayName),
    connect(undefined, mapDispatchToProps),
    withUser,
    withLayout,
    withExpenseApprovalAll,
    withStateHandlers<State, Updaters, WithApiExpenseApprovalAllOptions>(createProps, stateUpdaters), 
    withHandlers<AllProps, WithApiExpenseApprovalAllHandler>(handlerCreators),
    lifecycle<AllProps, {}>(lifeCycleFunctions),
  )(withApiExpenseAllWrapper);
};

export default withApiExpenseApprovalAll;