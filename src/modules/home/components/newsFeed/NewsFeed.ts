import { WithNewsFeed, withNewsFeed } from '@home/hoc/withNewsFeed';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
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

import { NewsFeedView } from './NewsFeedView';

interface IOwnOption {
  // initialCount: number;
}

interface IOwnState {
  // counter: number;
  // value: string;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // setIncrement: StateHandler<IOwnState>;
  // setDecrement: StateHandler<IOwnState>;
  setValue: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleVoid: () => void;
  // handleParams: (value: string) => void;
}

export type NewsFeedProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithNewsFeed
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  // counter: props.initialCount,
  // value: 'Test'
});

const stateUpdaters: StateUpdaters<NewsFeedProps, IOwnState, IOwnStateUpdater> = {
  // setIncrement: (prevState: IOwnState) => (value: number): Partial<IOwnState> => ({
  //   counter: prevState.counter + value,
  // }),
  // setDecrement: (prevState: IOwnState) => (value: number): Partial<IOwnState> => ({
  //   counter: prevState.counter - value,
  // }),
  setValue: (prevState: IOwnState) => (value: string): Partial<IOwnState> => ({
    value,
  })
};

const handlerCreators: HandleCreators<NewsFeedProps, IOwnHandler> = {
  handleVoid: (props: NewsFeedProps) => () => {
    alert('void method was called');
  },
  // handleParams: (props: NewsFeedProps) => (value: string) => {
  //   alert(`void method was called with param: 'value'`);
  // }
};

const lifeCycles: ReactLifeCycleFunctions<NewsFeedProps, IOwnState> = {
  componentDidMount() {
    const { isLoading, response } = this.props.newsFeedState.all;
    const { loadRequest } = this.props.newsFeedDispatch;
    
    if (!isLoading && !response) {
      loadRequest({});
    }
  }
};

export const NewsFeed = compose<NewsFeedProps, IOwnOption>(
  setDisplayName('NewsFeed'),
  injectIntl,
  withNewsFeed,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycles)
)(NewsFeedView);