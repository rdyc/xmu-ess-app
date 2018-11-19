import AppMenu from '@constants/AppMenu';
import { SortDirection } from '@generic/types';
import { ICollectionValue } from '@layout/classes/core';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ITravelGetAllRequest } from '@travel/classes/queries';
import withTravelRequestAll, { WithTravelRequestAll } from '@travel/enhancers/request/withTravelRequestAll';
import { travelGetAllDispose, travelGetAllRequest } from '@travel/store/actions';
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

export interface WithApiTravelRequestAllHandler {
  handleSync: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleSize: (value: number) => void;
  handleOrder: (field: ICollectionValue) => void;
  handleSort: (direction: SortDirection) => void;
}

interface WithApiTravelRequestAllOptions {
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
  travelAllDispatch: {
    getAllRequest: typeof travelGetAllRequest;
    getAllDispose: typeof travelGetAllDispose;
  };
}

type AllProps
  = WithApiTravelRequestAllHandler
  & Dispatcher
  & State
  & Updaters
  & WithUser
  & WithLayout
  & WithTravelRequestAll;

const withApiTravelRequestAll = (options?: WithApiTravelRequestAllOptions) => (WrappedComponent: React.ComponentType) => {
  const displayName = `WithApiTravelRequestAll(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  const withApiTravelRequestAllWrapper: React.SFC<AllProps> = props => <WrappedComponent {...props} />;

  const createProps: mapper<AllProps, State> = (props: AllProps): State => {
    const { request } = props.travelAllState;

    return { 
      orderBy: request && request.filter && request.filter.orderBy || options && options.orderBy,
      direction: request && request.filter && request.filter.direction || options && options.direction,
      page: request && request.filter && request.filter.page || options && options.page || 1, 
      size: request && request.filter && request.filter.size || options && options.size || 10,
    };
  };

  const stateUpdaters: StateUpdaters<WithApiTravelRequestAllOptions, State, Updaters> = {
    onNext: (prevState: State) => () => ({
      page: prevState.page + 1,
    }),
    onPrev: (prevState: State) => () => ({
      page: prevState.page - 1,
    }),
    onSync: (prevState: State) => () => ({
      page: 1,
    }),
    onOrder: (prevState: State) => (field: ICollectionValue) => ({
      orderBy: field.value,
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

  const handlerCreators: HandleCreators<AllProps, WithApiTravelRequestAllHandler> = {
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
    handleOrder: (props: AllProps) => (field: ICollectionValue) => { 
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
    travelAllDispatch: {
      getAllRequest: (request: ITravelGetAllRequest) => dispatch(travelGetAllRequest(request)),
      getAllDispose: () => dispatch(travelGetAllDispose()),
    }
  });

  const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, {}> = {
    componentDidMount() {
      const { response } = this.props.travelAllState;
      
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
      const { getAllDispose } = this.props.travelAllDispatch;

      // dispose 'get all' from 'redux store' when the page is 'out of travel request' context 
      if (view && view.parentUid !== AppMenu.TravelRequest) {
        getAllDispose();
      }
    }
  };

  const loadData = (props: AllProps): void => {
    const { orderBy, direction, page, size } = props;
    const { user } = props.userState;
    const { getAllRequest } = props.travelAllDispatch;
    const { alertAdd } = props.layoutDispatch;

    if (user) {
      getAllRequest({
        filter: {
          direction,
          orderBy,
          page,
          size,
          companyUid: undefined,
          positionUid: undefined,
          customerUid: undefined,
          isRejected: undefined,
          isSettlement: undefined,          
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

  return compose<AllProps, WithApiTravelRequestAllOptions>(
    setDisplayName(displayName),
    connect(undefined, mapDispatchToProps),
    withUser,
    withLayout,
    withTravelRequestAll,
    withStateHandlers<State, Updaters, WithApiTravelRequestAllOptions>(createProps, stateUpdaters),
    withHandlers<AllProps, WithApiTravelRequestAllHandler>(handlerCreators),
    lifecycle<AllProps, {}>(lifeCycleFunctions),
   )(withApiTravelRequestAllWrapper);
};

export default withApiTravelRequestAll;