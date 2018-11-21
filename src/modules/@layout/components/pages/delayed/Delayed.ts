import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import {
  compose,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withStateHandlers,
} from 'recompose';

import { DelayedView } from './DelayedView';

interface OwnOption {
  time: number;
}

interface OwnState {
  hidden: boolean;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setUnhide: StateHandler<OwnState>;
}

export type DelayedProps
  = OwnOption
  & OwnState
  & OwnStateUpdater
  & WithStyles<typeof styles>;

const createProps: mapper<DelayedProps, OwnState> = (props: DelayedProps): OwnState => ({
  hidden: true
});

const stateUpdaters: StateUpdaters<OwnOption, OwnState, OwnStateUpdater> = {
  setUnhide: (prev: OwnState) => (): Partial<OwnState> => ({
    hidden: false
  })
};

let timer: any;

const lifecycles: ReactLifeCycleFunctions<DelayedProps, OwnState> = {
  componentDidMount() {
    timer = setTimeout(() => this.props.setUnhide(), this.props.time);
  },
  componentWillUnmount() {
    clearTimeout(timer);
  }
};

export const Delayed = compose<DelayedProps, OwnOption>(
  setDisplayName('Delayed'),
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  lifecycle(lifecycles)
)(DelayedView);