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

import { PlayMarkdownView } from './PlayMarkdownView';

interface IOwnOption {
  //
}

interface IOwnState {
  value: string;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setValue: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleValue: (value: string) => void;
  handleSubmit: () => void;
}

export type PlayMarkdownProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  value: ''
});

const stateUpdaters: StateUpdaters<PlayMarkdownProps, IOwnState, IOwnStateUpdater> = {
  setValue: (prevState: IOwnState) => (value: string): Partial<IOwnState> => ({
    value,
  })
};

const handlerCreators: HandleCreators<PlayMarkdownProps, IOwnHandler> = {
  handleValue: (props: PlayMarkdownProps) => (value: string) => {
    props.setValue(value);
  },
  handleSubmit: (props: PlayMarkdownProps) => () => {
    const { value } = props;
    console.log(value);
  }
};

const lifeCycles: ReactLifeCycleFunctions<PlayMarkdownProps, IOwnState> = {
  componentDidMount() {
    console.log('component did mount');
  }
};

export const PlayMarkdown = compose<PlayMarkdownProps, IOwnOption>(
  setDisplayName('PlayMarkdown'),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycles)
)(PlayMarkdownView);