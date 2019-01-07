import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  pure,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { InputTextView } from './InputTextView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string; 
  placeholder?: string;
  required?: boolean;
  label: string; 
  disabled: boolean; 
  multiline: boolean;
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

export type InputTextProps 
  = OwnProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;
  
const handlerCreators: HandleCreators<InputTextProps, OwnHandlers> = {
  handleOnChange: (props: InputTextProps) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { 
    props.stateUpdate({
      value: event.target.value
    });
  },
  handleOnBlur: (props: InputTextProps) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { 
    props.input.onChange(props.value);
  }
};

const createProps: mapper<InputTextProps, OwnState> = (props: InputTextProps): OwnState => ({
  value: props.input.value
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<InputTextProps, {}> = {
  componentDidUpdate(prevProps: InputTextProps) {
    if (prevProps.input.value !== this.props.input.value) {
      this.props.stateUpdate({
        value: this.props.input.value
      });
    }
  }
};

export const InputText = compose<InputTextProps, OwnProps>(
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  pure
)(InputTextView);