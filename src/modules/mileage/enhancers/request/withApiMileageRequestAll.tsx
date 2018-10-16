import AppMenu from '@constants/AppMenu';
import { SortDirection } from '@generic/types';
import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { withUser, WithUser } from '@layout/hoc/withUser';
import { IListBarField } from '@layout/interfaces';
import { IMileageRequestGetAllRequest } from '@mileage/classes/queries';
import withMileageRequestAll, {
  WithMileageRequestAll
} from '@mileage/enhancers/request/withMileageRequestAll';
import {
  mileagerequestGetAllDispose,
  mileagerequestGetAllRequest
} from '@mileage/store/actions';
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

export interface WithApiMileageRequestAllHandler {
  handleSync: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleSize: (value: number) => void;
  handleOrder: (field: IListBarField) => void;
  handleSort: (direction: SortDirection) => void;
}

interface WithApiMileageRequestAllOptions {
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
  mileagerequestAllDispatch: {
    getAllRequest: typeof mileagerequestGetAllRequest;
    getAllDispose: typeof mileagerequestGetAllDispose;
  };
}

type AllProps = WithApiMileageRequestAllOptions &
  Dispatcher &
  State &
  Updaters &
  WithUser &
  WithLayout &
  WithMileageRequestAll;

const withApiMileageRequestAll = (
  options?: WithApiMileageRequestAllOptions
) => (WrappedComponent: React.ComponentType) => {
  const displayName = `WithApiMileageRequestAll(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`;

  const withApiMileageRequestAllWrapper: React.SFC<AllProps> = props => (
    <WrappedComponent {...props} />
  );

  const createProps: mapper<AllProps, State> = (props: AllProps): State => {
    const { request } = props.mileagerequestAllState;

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
    WithApiMileageRequestAllOptions,
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

  const handleCreators: HandleCreators<
    AllProps,
    WithApiMileageRequestAllHandler
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
    mileagerequestAllDispatch: {
      getAllRequest: (request: IMileageRequestGetAllRequest) =>
        dispatch(mileagerequestGetAllRequest(request)),
      getAllDispose: () => dispatch(mileagerequestGetAllDispose())
    }
  });

  const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, {}> = {
    componentDidMount() {
      const { response } = this.props.mileagerequestAllState;

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
      const { getAllDispose } = this.props.mileagerequestAllDispatch;

      // dispose 'get all' from 'redux store' when the page is 'out of mileage request' context
      if (view && view.parentUid !== AppMenu.MileageRequest) {
        getAllDispose();
      }
    }
  };

  const loadData = (props: AllProps): void => {
    const { orderBy, direction, page, size } = props;
    const { user } = props.userState;
    const { getAllRequest } = props.mileagerequestAllDispatch;
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
          year: undefined,
          month: undefined,
          isRejected: undefined,
          companyUid: undefined,
          positionUid: undefined,
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

  return compose<AllProps, WithApiMileageRequestAllOptions>(
    setDisplayName(displayName),
    connect(
      undefined,
      mapDispatchToProps
    ),
    withUser,
    withLayout,
    withMileageRequestAll,
    withStateHandlers<State, Updaters, WithApiMileageRequestAllOptions>(
      createProps,
      stateUpdaters
    ),
    withHandlers<AllProps, WithApiMileageRequestAllHandler>(handleCreators),
    lifecycle<AllProps, {}>(lifeCycleFunctions)
  )(withApiMileageRequestAllWrapper);
};

export default withApiMileageRequestAll;