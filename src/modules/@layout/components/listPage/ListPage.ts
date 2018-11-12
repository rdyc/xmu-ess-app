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

import { ListPageView } from './ListPageView';

interface OwnOption {
  initialCount: number;
}

interface OwnState {
  counter: number;
  value: string;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setIncrement: StateHandler<OwnState>;
  setDecrement: StateHandler<OwnState>;
  setValue: StateHandler<OwnState>;
}

interface OwnHandler {
  handleVoid: () => void;
  handleParams: (value: string) => void;
}

export type ListPageProps
  = OwnOption
  & OwnState
  & OwnStateUpdater
  & OwnHandler;

const createProps: mapper<ListPageProps, OwnState> = (props: ListPageProps): OwnState => ({
  counter: props.initialCount,
  value: 'Test'
});

const stateUpdaters: StateUpdaters<OwnOption, OwnState, OwnStateUpdater> = {
  setIncrement: (prev: OwnState) => (value: number): Partial<OwnState> => ({
    counter: prev.counter + value,
  }),
  setDecrement: (prev: OwnState) => (value: number): Partial<OwnState> => ({
    counter: prev.counter - value,
  }),
  setValue: (prev: OwnState) => (value: string): Partial<OwnState> => ({
    value,
  })
};

const handlerCreators: HandleCreators<ListPageProps, OwnHandler> = {
    handleVoid: (props: ListPageProps) => () => {
    alert('void method was called');
  },
  handleParams: (props: ListPageProps) => (value: string) => {
    alert(`void method was called with param: 'value'`);
  }
};

const lifecycles: ReactLifeCycleFunctions<ListPageProps, OwnState> = {
  componentWillMount() {
    console.log('component will mount');
  },
  componentDidMount() {
    console.log('component did mount');
  },
  componentWillReceiveProps(nextProps: ListPageProps) {
    console.log('component will receive props');
  },
  componentWillUpdate(nextProps: ListPageProps, nextState: OwnState) {
    console.log('component will update');
  },
  componentDidUpdate(prevProps: ListPageProps, prevState: OwnState) {
    console.log('component did update');
  },
  componentWillUnmount() {
    console.log('component will unmount');
  }
};

export const ListPage = compose<ListPageProps, OwnOption>(
  setDisplayName('ListPage'),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(ListPageView);