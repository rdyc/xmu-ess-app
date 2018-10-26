import { compose, mapper, StateHandler, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';
import { BaseFieldsProps, WrappedFieldProps } from 'redux-form';

import { InputRadioView } from './InputRadioView';

interface OwnProps extends WrappedFieldProps, BaseFieldsProps { 
  type?: string; 
  placeholder?: string;
  required?: boolean;
  label: string; 
  disabled: boolean; 
  context: BaseFieldsProps;
  names: string[];
}

interface OwnState {
  selected: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setStateValue: StateHandler<OwnState>;
}

export type InputRadioProps 
  = OwnProps
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<InputRadioProps, OwnState> = (props: InputRadioProps): OwnState => {
    const { input } = props;
  
    return { 
      selected: input.value
    };
  };
  
const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
    setStateValue: (prevState: OwnState) => (selected: string) => ({
      selected
    }),
  };

export const InputRadio = compose<InputRadioProps, OwnProps>(
  withStateHandlers<OwnState, OwnStateUpdaters>(createProps, stateUpdaters),
)(InputRadioView);