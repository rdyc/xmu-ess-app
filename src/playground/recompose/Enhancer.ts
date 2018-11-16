import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { enhancerView } from './enhancerView';

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

export type EnhancerProps
  = OwnOption
  & OwnState
  & OwnStateUpdater
  & OwnHandler;

const createProps: mapper<EnhancerProps, OwnState> = (props: EnhancerProps): OwnState => ({ 
  counter: props.initialCount,
  value: 'Kamvret'
});

const stateUpdaters: StateUpdaters<EnhancerProps, OwnState, OwnStateUpdater> = {
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

const handlerCreators: HandleCreators<EnhancerProps, OwnHandler> = {
  handleVoid: (props: EnhancerProps) => () => {
    alert('void method was called');
  },
  handleParams: (props: EnhancerProps) => (value: string) => {
    alert(`void method was called with param: '${value}'`);
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<EnhancerProps, OwnState> = {
  componentWillMount() { 
    console.log('component will mount'); 
  },
  componentWillReceiveProps() { 
    console.log('component will receive props'); 
  },
  componentDidMount() { 
    console.log('component did mount'); 
  },
  componentWillUpdate() { 
    console.log('component will update'); 
  },
  componentDidUpdate() { 
    console.log('component did update'); 
  },
  componentWillUnmount() { 
    console.log('component will unmount'); 
  }
};

export const Enhancer = compose<EnhancerProps, OwnOption>(
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions)
)(enhancerView);