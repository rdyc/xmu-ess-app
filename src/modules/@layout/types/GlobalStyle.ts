import { TextFieldProps } from '@material-ui/core/TextField';

const readOnly: Partial<TextFieldProps> = {
  fullWidth: true,
  margin: 'dense',
  InputProps: {
    disableUnderline: true,
    readOnly: true
  }
};

export const GlobalStyle = {
  TextField: {
    ReadOnly: readOnly
  }
};