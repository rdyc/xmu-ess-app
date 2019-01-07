import { compose } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InputColoredNumberView } from './InputColoredNumberView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string;
  required?: boolean;
  placeholder?: string;
  label: string; 
  disabled: boolean; 
  disableInput: boolean;
}

export type InputColoredNumberProps 
  = OwnProps
  & WithStyles<typeof styles>;

export const InputColoredNumber = compose<InputColoredNumberProps, OwnProps>(
  withStyles(styles)
)(InputColoredNumberView);