import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  shallowEqual,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { StepperView } from './StepperView';

export interface IStepperSource {
  label: string;
  imgPath: string;
}
interface IOwnOption {
  source: IStepperSource[];
  autoplay?: boolean;
  interval?: number;
}

interface IOwnState {
  activeStep: number;
  timer?: NodeJS.Timeout;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setNext: StateHandler<IOwnState>;
  setBack: StateHandler<IOwnState>;
  setChange: StateHandler<IOwnState>;
  setTimer: StateHandler<IOwnState>;
}

interface IOwnHandler {
  startInterval: () => void;
}

export type StepperProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler
  & WithStyles<typeof styles>;

const createProps: mapper<StepperProps, IOwnState> = (props: StepperProps): IOwnState => ({
  activeStep: 0,
});

const stateUpdaters: StateUpdaters<IOwnOption, IOwnState, IOwnStateUpdaters> = {
  setNext: (prevState: IOwnState, outter: IOwnOption) => (): Partial<IOwnState> => ({
    activeStep: prevState.activeStep !== outter.source.length - 1 ? prevState.activeStep + 1 : 0
  }),
  setBack: (prevState: IOwnState, outter: IOwnOption) => (): Partial<IOwnState> => ({
    activeStep: prevState.activeStep !== 0 ? prevState.activeStep - 1 : outter.source.length - 1
  }),
  setChange: (prevState: IOwnState, outter: IOwnOption) => (index: number, indexLatest: number): Partial<IOwnState> => ({
    activeStep: index === indexLatest ? 0 : index
  }),
  setTimer: (prevState: IOwnState, outter: IOwnOption) => (timer: NodeJS.Timeout): Partial<IOwnState> => ({
    timer
  })
};

const handlerCreators: HandleCreators<StepperProps, IOwnHandler> = {
  startInterval: (props: StepperProps) => () => { 
    const { autoplay, interval, timer } = props;

    if (timer) {
      clearInterval(timer);
    }

    if (autoplay) {
      const _timer = setInterval(props.setNext, interval || 3000);

      props.setTimer(_timer);
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<StepperProps, {}> = {
  componentDidMount() {
    this.props.startInterval();
  },
  componentDidUpdate(prevProps: StepperProps) {
    const shouldResetInterval = !shallowEqual(
      {
        activeStep: prevProps.activeStep,
        interval: prevProps.interval,
        autoplay: prevProps.autoplay,
      },
      {
        activeStep: this.props.activeStep,
        interval: this.props.interval,
        autoplay: this.props.autoplay,
      },
    );

    if (shouldResetInterval) {
      this.props.startInterval();
    }
  },
  componentWillUnmount() {
    if (this.props.timer) {
      clearInterval(this.props.timer);
    }
  }
};

export const Stepper = compose<StepperProps, IOwnOption>(
  setDisplayName('Stepper'),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles)
)(StepperView);