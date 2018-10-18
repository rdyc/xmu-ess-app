import AppMenu from '@constants/AppMenu';
import { SortDirection } from '@generic/types';
import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { withUser, WithUser } from '@layout/hoc/withUser';
import { IListBarField } from '@layout/interfaces';

import { IMileageExceptionAllRequest } from '@lookup/classes/queries';
import withMileageExceptionAll, {
  WithMileageExceptionAll
} from '@lookup/enhancers/mileageException/withMileageExceptionAll';
import {
  mileageExceptionGetAllDispose,
  mileageExceptionGetAllRequest
} from '@lookup/store/actions';

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
  withStateHandlers
} from 'recompose';
import { Dispatch } from 'redux';

export interface WithApiMileageExceptionAllHandler {
  handleSync: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleSize: (value: number) => void;
  handleOrder: (field: IListBarField) => void;
  handleSort: (direction: SortDirection) => void;
}

interface WithApiMileageExceptionAllOptions {
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
  mileageExceptionAllDispatch: {
    getAllRequest: typeof mileageExceptionGetAllRequest;
    getAllDispose: typeof mileageExceptionGetAllDispose;
  };
}

type AllProps = WithApiMileageExceptionAllHandler &
  Dispatcher &
  State &
  Updaters &
  WithUser &
  WithLayout &
  WithMileageExceptionAll;

const withApiMileageExceptionAll = (
  options?: WithApiMileageExceptionAllOptions
) => (WrappedComponent: React.ComponentType) => {
  const displayName = `WithApiMileageExceptionAll(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`;

  const withApiMileageExceptionAllWrapper: React.SFC<AllProps> = props => (
    <WrappedComponent {...props} />
  );

  const createProps: mapper<AllProps, State> = (props: AllProps): State => {
    const { request } = props.mileageExceptionAllState;

    return {
      orderBy:
        (request && request.filter && request.filter.orderBy) ||
        (options && options.orderBy),
      direction:
        (request && request.filter && request.filter.direction) ||
        (options && options.direction),
      page:
        (request && request.filter && request.filter.page) ||
        (options && options.page) ||
        1,
      size:
        (request && request.filter && request.filter.size) ||
        (options && options.size) ||
        10
    };
  };

  const stateUpdaters: StateUpdaters<
    WithApiMileageExceptionAllOptions,
    State,
    Updaters
  > = {
    onNext: (prevState: State) => () => ({
      page: prevState.page + 1
    }),
    onPrev: (prevState: State) => () => ({
      page: prevState.page - 1
    }),
    onSync: (prevState: State) => () => ({
      page: 1
    }),
    onOrder: (prevState: State) => (field: IListBarField) => ({
      orderBy: field.id,
      page: 1
    }),
    onSort: (prevState: State) => (direction: SortDirection) => ({
      direction,
      page: 1
    }),
    onSize: (prevState: State) => (size: number) => ({
      size,
      page: 1
    })
  };

  const handlerCreators: HandleCreators<
    AllProps,
    WithApiMileageExceptionAllHandler
  > = {
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
    mileageExceptionAllDispatch: {
      getAllRequest: (request: IMileageExceptionAllRequest) =>
        dispatch(mileageExceptionGetAllRequest(request)),
      getAllDispose: () => dispatch(mileageExceptionGetAllDispose())
    }
  });

  const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, {}> = {
    componentDidMount() {
      const { response } = this.props.mileageExceptionAllState;

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
      const { getAllDispose } = this.props.mileageExceptionAllDispatch;

      // dispose 'get all' from 'redux store' when the page is 'out of mileage exception' context
      if (view && view.parentUid !== AppMenu.LookupMileageException) {
        getAllDispose();
      }
    }
  };

  const loadData = (props: AllProps): void => {
    const { orderBy, direction, page, size } = props;
    const { user } = props.userState;
    const { getAllRequest } = props.mileageExceptionAllDispatch;
    const { alertAdd } = props.layoutDispatch;

    if (user) {
      getAllRequest({
        filter: {
          direction,
          orderBy,
          page,
          size,
          find: undefined,
          findBy: undefined
        }
      });
    } else {
      alertAdd({
        time: new Date(),
        message: 'Unable to find current user state'
      });
    }
  };

  return compose<AllProps, WithApiMileageExceptionAllOptions>(
    setDisplayName(displayName),
    connect(
      undefined,
      mapDispatchToProps
    ),
    withUser,
    withLayout,
    withMileageExceptionAll,
    withStateHandlers<State, Updaters, WithApiMileageExceptionAllOptions>(createProps, stateUpdaters),
    withHandlers<AllProps, WithApiMileageExceptionAllHandler>(handlerCreators),
    lifecycle<AllProps, {}>(lifeCycleFunctions)
  )(withApiMileageExceptionAllWrapper);
};

export default withApiMileageExceptionAll;
