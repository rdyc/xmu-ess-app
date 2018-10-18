import AppMenu from '@constants/AppMenu';
import { IExpenseGetAllRequest } from '@expense/classes/queries/request';
import withExpenseAll, { WithExpenseAll } from '@expense/enhancers/request/withExpenseAll';
import { expenseGetAllDispose, expenseGetAllRequest } from '@expense/store/actions';
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

export interface WithApiExpenseAllHandler {
  handleSync: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleSize: (value: number) => void;
  handleOrder: (field: IListBarField) => void;
  handleSort: (direction: SortDirection) => void;
}

interface WithApiExpenseAllOptions {
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
    getAllRequest: typeof expenseGetAllRequest;
    getAllDispose: typeof expenseGetAllDispose;
  };
}

type AllProps 
  = WithApiExpenseAllHandler
  & Dispatcher
  & State
  & Updaters
  & WithUser
  & WithLayout
  & WithExpenseAll;

const withApiExpenseAll = (options?: WithApiExpenseAllOptions) => (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithApiExpenseAll(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withApiExpenseAllWrapper: React.SFC<AllProps> = props => <WrappedComponent {...props} />;

  const createProps: mapper<AllProps, State> = (props: AllProps): State => {
    const { request } = props.expenseAllState;

    return { 
      orderBy: request && request.filter && request.filter['query.orderBy'] || options && options.orderBy,
      direction: request && request.filter && request.filter['query.direction'] || options && options.direction,
      page: request && request.filter && request.filter['query.page'] || options && options.page || 1, 
      size: request && request.filter && request.filter['query.size'] || options && options.size || 10,
    };
  };

  const stateUpdaters: StateUpdaters<WithApiExpenseAllOptions, State, Updaters> = {
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

  const handlerCreators: HandleCreators<AllProps, WithApiExpenseAllHandler> = {
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
      getAllRequest: (request: IExpenseGetAllRequest) => dispatch(expenseGetAllRequest(request)),
      getAllDispose: () => dispatch(expenseGetAllDispose()),
    }
  });

  const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, {}> = {
    componentDidMount() {
      const { response } = this.props.expenseAllState;
      
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
          isRejected: undefined,
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

  return compose<AllProps, WithApiExpenseAllOptions>(
    setDisplayName(displayName),
    connect(undefined, mapDispatchToProps),
    withUser,
    withLayout,
    withExpenseAll,
    withStateHandlers<State, Updaters, WithApiExpenseAllOptions>(createProps, stateUpdaters), 
    withHandlers<AllProps, WithApiExpenseAllHandler>(handlerCreators),
    lifecycle<AllProps, {}>(lifeCycleFunctions),
  )(withApiExpenseAllWrapper);
};

export default withApiExpenseAll;