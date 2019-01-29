import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { InputFileView } from './InputFileView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  accept?: string; 
  placeholder?: string;
  required?: boolean;
  label: string; 
  disabled: boolean; 
}

interface OwnHandlers {
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export type InputFileProps 
  = OwnProps
  & OwnHandlers;
  
const handlerCreators: HandleCreators<InputFileProps, OwnHandlers> = {
  handleOnChange: (props: InputFileProps) => (event: React.ChangeEvent<HTMLInputElement>) => { 
    props.input.onChange(event.target.files);
  }
};

export const InputFile = compose<InputFileProps, OwnProps>(
  withHandlers(handlerCreators),
)(InputFileView);