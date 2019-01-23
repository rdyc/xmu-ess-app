import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { compose, mapper, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

import { StepperView } from './StepperView';

export interface IStepperSource {
  label: string;
  imgPath: string;
}
interface IOwnOption {
  source: IStepperSource[];
}

interface IOwnState {
  activeStep: number;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  handleNext: StateHandler<IOwnState>;
  handleBack: StateHandler<IOwnState>;
  handleChange: StateHandler<IOwnState>;
}

export type StepperProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdaters
  & WithStyles<typeof styles>;

const createProps: mapper<StepperProps, IOwnState> = (props: StepperProps): IOwnState => ({
  activeStep: 0
});

const stateUpdaters: StateUpdaters<IOwnOption, IOwnState, IOwnStateUpdaters> = {
  handleNext: (prevState: IOwnState, outter: IOwnOption) => (): Partial<IOwnState> => ({
    activeStep: prevState.activeStep !== outter.source.length - 1 ? prevState.activeStep + 1 : 0
  }),
  handleBack: (prevState: IOwnState, outter: IOwnOption) => (): Partial<IOwnState> => ({
    activeStep: prevState.activeStep !== 0 ? prevState.activeStep - 1 : outter.source.length - 1
  }),
  handleChange: (prevState: IOwnState, outter: IOwnOption) => (index: number, indexLatest: number): Partial<IOwnState> => ({
    activeStep: index === indexLatest ? 0 : index
  })
};

export const Stepper = compose<StepperProps, IOwnOption>(
  setDisplayName('Stepper'),
  withStyles(styles, { withTheme: true }),
  withStateHandlers(createProps, stateUpdaters),
)(StepperView);