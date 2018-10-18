import AppMenu from '@constants/AppMenu';
import { IFinanceGetAllRequest } from '@finance/classes/queries';
import withFinanceAll, { WithFinanceAll } from '@finance/enhancers/approval/withFinanceAll';
import { financeGetAllDispose, financeGetAllRequest } from '@finance/store/actions';
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

export interface WithApiFinanceAllHandler {
  handleSync: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleSize: (value: number) => void;
  handleOrder: (field: IListBarField) => void;
  handleSort: (direction: SortDirection) => void;
}

interface WithApiFinanceAllOptions {
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
  financeAllDispatch: {
    getAllRequest: typeof financeGetAllRequest;
    getAllDispose: typeof financeGetAllDispose;
  };
}

type AllProps 
  = WithApiFinanceAllHandler
  & Dispatcher
  & State
  & Updaters
  & WithUser
  & WithLayout
  & WithFinanceAll;

const withApiFinanceAll = (options?: WithApiFinanceAllOptions) => (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithApiFinanceAll(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withApiFinanceAllWrapper: React.SFC<AllProps> = props => <WrappedComponent {...props} />;

  const createProps: mapper<AllProps, State> = (props: AllProps): State => {
    const { request } = props.financeAllState;

    return { 
      orderBy: request && request.filter && request.filter.orderBy || options && options.orderBy,
      direction: request && request.filter && request.filter.direction || options && options.direction,
      page: request && request.filter && request.filter.page || options && options.page || 1, 
      size: request && request.filter && request.filter.size || options && options.size || 10,
    };
  };

  const stateUpdaters: StateUpdaters<WithApiFinanceAllOptions, State, Updaters> = {
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

  const handlerCreators: HandleCreators<AllProps, WithApiFinanceAllHandler> = {
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
    financeAllDispatch: {
      getAllRequest: (request: IFinanceGetAllRequest) => dispatch(financeGetAllRequest(request)),
      getAllDispose: () => dispatch(financeGetAllDispose()),
    }
  });

  const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, {}> = {
    componentDidMount() {
      const { response } = this.props.financeAllState;
      
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
      const { getAllDispose } = this.props.financeAllDispatch;

      // dispose 'get all' from 'redux store' when the page is 'out of finance' context 
      if (view && view.parentUid !== AppMenu.FinanceApproval) {
        getAllDispose();
      }
    }
  };

  const loadData = (props: AllProps): void => {
    const { orderBy, direction, page, size } = props;
    const { user } = props.userState;
    const { getAllRequest } = props.financeAllDispatch;
    const { alertAdd } = props.layoutDispatch;

    if (user) {
      getAllRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        filter: {
          direction,
          orderBy,
          page,
          size,
          moduleType: undefined,
          employeeName: undefined,
          financeStatusTypes: undefined,
          settlementStatusTypes: undefined,
          find: undefined,
          findBy: undefined,
        }
      }); 
    } else {
      alertAdd({
        time: new Date(),
        message: 'Unable to find current user state'
      });
    }
  };

  return compose<AllProps, WithApiFinanceAllOptions>(
    setDisplayName(displayName),
    connect(undefined, mapDispatchToProps),
    withUser,
    withLayout,
    withFinanceAll,
    withStateHandlers<State, Updaters, WithApiFinanceAllOptions>(createProps, stateUpdaters), 
    withHandlers<AllProps, WithApiFinanceAllHandler>(handlerCreators),
    lifecycle<AllProps, {}>(lifeCycleFunctions),
  )(withApiFinanceAllWrapper);
};

export default withApiFinanceAll;