import {
  compose,
  HandleCreators,
  withHandlers,
} from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { InputImageView } from './InputImageView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  accept?: string;
  required?: boolean;
  placeholder?: string;
  disabled: boolean;
  label: string;
}

interface OwnHandlers {
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// interface OwnState {
//   value?: any;
//   showImage?: any;
// }

// interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
//   stateUpdate: StateHandler<OwnState>;
// }

export type InputImageProps
  = OwnProps
  & OwnHandlers;
  // & OwnState
  // & WithStyles<typeof styles>
  // & OwnStateUpdaters;

// const createProps: mapper<InputImageProps, OwnState> = (props: InputImageProps): OwnState => ({
//   value: props.input.value,
//   showImage: ''
// });

const handlerCreators: HandleCreators<InputImageProps, OwnHandlers> = {
  handleImageChange: (props: InputImageProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // const reader = new FileReader();
    
    // reader.readAsArrayBuffer(event[0]);

    props.input.onChange(event.target.files);

    // props.stateUpdate({
    //   value: event.target.files,
    //   showImage: URL.createObjectURL(event.target.files && event.target.files[0])
    // });
  },
};

// const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
//   stateUpdate: (prevState: OwnState) => (newState: any) => ({
//     ...prevState,
//     ...newState
//   })
// };

// const lifecycles: ReactLifeCycleFunctions<InputImageProps, {}> = {
//   componentDidUpdate(prevProps: InputImageProps) {
//     console.log(`${this.props.value} - ${this.props.reader} - ${this.props.showImage}`);
//     if (prevProps.input.value !== this.props.input.value || prevProps.showImage !== this.props.showImage) {
//       this.props.stateUpdate({
//         value: this.props.input.value,
//         showImage: this.props.showImage
//       });
//     }
//   }
// };

export const InputImage = compose<InputImageProps, OwnProps>(
  // withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  // lifecycle(lifecycles),
  // withStyles(styles),
)(InputImageView);