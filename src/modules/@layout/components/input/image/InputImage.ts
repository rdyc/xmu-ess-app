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
}

interface OwnState {
  value?: any;
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
    const reader = new FileReader();
    // const resultReader = new ArrayBuffer();
    
    reader.readAsArrayBuffer(event[0]);

    console.log(reader);
    props.input.onChange(reader);

    // reader.onloadend = function(e) {
      
    // }
    props.stateUpdate({
      value: reader
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
    if (prevProps.input.value !== this.props.input.value) {
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
)(InputImageView);