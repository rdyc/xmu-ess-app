import {
  compose,
  HandleCreators,
  mapper,
  pure,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { InputTextProps } from '../text/InputText';
import { InputTextAreaView } from './InputTextAreaView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string; 
  placeholder?: string;
  required?: boolean;
  label: string; 
  disabled: boolean; 
}

interface OwnHandlers {
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleOnBlur: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}
interface OwnState {
  value: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type InputTextAreaProps 
  = OwnProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<InputTextAreaProps, OwnHandlers> = {
  handleOnChange: (props: InputTextProps) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { 
    props.stateUpdate({
      value: event.target.value
    });
  },
  handleOnBlur: (props: InputTextAreaProps) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { 
    props.input.onChange(props.value);
  }
};

const createProps: mapper<InputTextAreaProps, OwnState> = (props: InputTextAreaProps): OwnState => ({
  value: props.input.value
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

export const InputTextArea = compose<InputTextAreaProps, OwnProps>(
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  pure
)(InputTextAreaView);