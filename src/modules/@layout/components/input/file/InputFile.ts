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

import { InputFileView } from './InputFileView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string; 
  placeholder?: string;
  required?: boolean;
  label: string; 
  disabled: boolean; 
}

interface OwnHandlers {
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface OwnState {
  value?: FileList;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type InputFileProps 
  = OwnProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;
  
const handlerCreators: HandleCreators<InputFileProps, OwnHandlers> = {
  handleOnChange: (props: InputFileProps) => (event: React.ChangeEvent<HTMLInputElement>) => { 
    props.stateUpdate({
      value: event.target.files
    });
  },
  handleOnBlur: (props: InputFileProps) => (event: React.ChangeEvent<HTMLInputElement>) => { 
    props.input.onChange(props.value);
  }
};

const createProps: mapper<InputFileProps, OwnState> = (props: InputFileProps): OwnState => ({
  // value: props.input.value
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<InputFileProps, {}> = {
  componentDidUpdate(prevProps: InputFileProps) {
    if (prevProps.input.value !== this.props.input.value) {
      this.props.stateUpdate({
        value: this.props.input.value
      });
    }
  }
};

export const InputFile = compose<InputFileProps, OwnProps>(
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  pure
)(InputFileView);