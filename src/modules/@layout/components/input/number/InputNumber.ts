import { compose, mapper, StateHandler, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { InputNumberView } from './InputNumberView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string; 
  placeholder?: string;
  label: string; 
  disabled: boolean; 
}

interface OwnState {
  value: any;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setStateValue: StateHandler<OwnState>;
}

export type InputNumberProps 
  = OwnProps
  & OwnState
  & OwnStateUpdaters;
  
const createProps: mapper<InputNumberProps, OwnState> = (props: InputNumberProps): OwnState => {
  const { input } = props;

  return { 
    value: input.value
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  setStateValue: (prevState: OwnState) => (value: any) => ({
    value
  }),
};

export const InputNumber = compose<InputNumberProps, OwnState>(
  withStateHandlers<OwnState, OwnStateUpdaters>(createProps, stateUpdaters),
)(InputNumberView);