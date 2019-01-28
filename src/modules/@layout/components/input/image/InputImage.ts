import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  // pure,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { InputImageView } from './InputImageView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string;
  required?: boolean;
  placeholder: string;
  disabled: boolean;
  label: string;
}

interface OwnHandlers {
  handleImageChange: (event: FileList) => void;

  // handleOnDrop: (image: any) => void;
}

interface OwnState {
  value?: File;
  image: any[];
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type InputImageProps
  = OwnProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<InputImageProps, OwnState> = (props: InputImageProps): OwnState => ({
  // value: props.input.value,
  image: []
});

const handlerCreators: HandleCreators<InputImageProps, OwnHandlers> = {
  handleImageChange: (props: InputImageProps) => (event: FileList) => {
    console.log(`${event} - ${event[0]} + VALUE ${props.value}`);
    props.input.onChange(event[0]);

    props.stateUpdate({
      value: event[0]
    });
  },
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<InputImageProps, {}> = {
  componentDidUpdate(prevProps: InputImageProps) {
    console.log(`LAMA = ${prevProps.input.value}`);
    console.log(`BARU = ${this.props.input.value}`);
    if (prevProps.input.value !== this.props.input.value) {
      console.log('MASUK PAK EKOOOO');
      this.props.stateUpdate({
        value: this.props.input.value
      });
    }
  }
};

export const InputImage = compose<InputImageProps, OwnProps>(
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  // pure
)(InputImageView);