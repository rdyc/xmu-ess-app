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

import { FormPageView } from './FormPageView';

interface IOwnOption {
  initialCount: number;
}

interface IOwnState {
  counter: number;
  value: string;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setIncrement: StateHandler<IOwnState>;
  setDecrement: StateHandler<IOwnState>;
  setValue: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleVoid: () => void;
  handleParams: (value: string) => void;
}

export type FormPageProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  counter: props.initialCount,
  value: 'Test'
});

const stateUpdaters: StateUpdaters<FormPageProps, IOwnState, IOwnStateUpdater> = {
  setIncrement: (prevState: IOwnState) => (value: number): Partial<IOwnState> => ({
    counter: prevState.counter + value,
  }),
  setDecrement: (prevState: IOwnState) => (value: number): Partial<IOwnState> => ({
    counter: prevState.counter - value,
  }),
  setValue: (prevState: IOwnState) => (value: string): Partial<IOwnState> => ({
    value,
  })
};

const handlerCreators: HandleCreators<FormPageProps, IOwnHandler> = {
  handleVoid: (props: FormPageProps) => () => {
    alert('void method was called');
  },
  handleParams: (props: FormPageProps) => (value: string) => {
    alert(`void method was called with param: 'value'`);
  }
};

const lifeCycles: ReactLifeCycleFunctions<FormPageProps, IOwnState> = {
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

export const FormPage = compose<FormPageProps, IOwnOption>(
  setDisplayName('FormPage'),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycles)
)(FormPageView);