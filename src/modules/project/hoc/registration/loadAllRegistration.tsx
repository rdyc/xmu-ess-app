import { SortDirection } from '@generic/types';
import withUser, { WithUser } from '@layout/hoc/withUser';
import { IListBarField } from '@layout/interfaces';
import { IProjectGetAllRequest } from '@project/classes/queries';
import { projectGetAllRequest } from '@project/store/actions';
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

export interface LoadAllRegistrationHandler {
  handleSync: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleSize: (value: number) => void;
  handleOrder: (field: IListBarField) => void;
  handleSort: (direction: SortDirection) => void;
}

interface LoadAllRegistrationOptions {
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
  projectDispatch: {
    getAllRequest: typeof projectGetAllRequest;
  };
}

type AllProps 
  = LoadAllRegistrationHandler
  & Dispatcher
  & State
  & Updaters
  & WithUser;

const loadAllRegistration = (options?: LoadAllRegistrationOptions) => (WrappedComponent: React.ComponentType) => { 
  const displayName = `LoadAllRegistration(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const loadAllRegistrationSFC: React.SFC<AllProps> = props => <WrappedComponent {...props} />;

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    projectDispatch: {
      getAllRequest: (request: IProjectGetAllRequest) => dispatch(projectGetAllRequest(request)),
    }
  });

  const createProps: mapper<LoadAllRegistrationOptions, State> = (props: LoadAllRegistrationOptions): State => ({ 
    orderBy: options && options.orderBy,
    direction: options && options.direction,
    page: options && options.page || 1, 
    size: options && options.size || 10,
  });

  const stateUpdaters: StateUpdaters<LoadAllRegistrationOptions, State, Updaters> = {
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

  const handlerCreators: HandleCreators<AllProps, LoadAllRegistrationHandler> = {
    handleSync: (props: AllProps) => () => { 
      props.onSync();

      loadData(props);
    },
    handleNext: (props: AllProps) => () => { 
      props.onNext();

      loadData(props);
    },
    handlePrev: (props: AllProps) => () => { 
      props.onPrev();

      loadData(props);
    },
    handleOrder: (props: AllProps) => (field: IListBarField) => { 
      props.onOrder(field);

      loadData(props);
    },
    handleSize: (props: AllProps) => (value: number) => { 
      props.onSize(value);

      loadData(props);
    },
    handleSort: (props: AllProps) => (direction: SortDirection) => { 
      props.onSort(direction);

      loadData(props);
    }
  };

  const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, {}> = {
    componentDidMount() { 
      loadData(this.props);
    },
  };

  const loadData = (props: AllProps): void => {
    const { orderBy, direction, page, size } = props;
    const { user } = props.userState;
    const { getAllRequest } = props.projectDispatch;

    if (user) {
      getAllRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        filter: {
          direction,
          orderBy,
          page,
          size,
          customerUids: undefined,
          projectTypes: undefined,
          statusTypes: undefined,
          find: undefined,
          findBy: undefined,
        }
      }); 
    }
  };

  return compose<AllProps, LoadAllRegistrationOptions>(
    connect(undefined, mapDispatchToProps),
    
    withUser,
    withStateHandlers<State, Updaters, LoadAllRegistrationOptions>(createProps, stateUpdaters), 
    withHandlers<AllProps, LoadAllRegistrationHandler>(handlerCreators),
    
    lifecycle<AllProps, {}>(lifeCycleFunctions),
    
    setDisplayName(displayName),
  )(loadAllRegistrationSFC);
};

export default loadAllRegistration;