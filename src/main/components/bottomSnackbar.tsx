import * as React from 'react';
import { Button, Snackbar, WithStyles } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import styles from '../styles';
import { ConnectedReduxProps } from '../store';
import { setAlertSnackbar } from '../store/@layout';
import { SnackbarType } from '../constants/snackbarType';
import CloseIcon from '@material-ui/icons/Close';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  alertSnackbar: SnackbarType;
}

interface PropsFromDispatch {
  setAlertSnackbar: typeof setAlertSnackbar;
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;

export const bottomSnackbar: React.StatelessComponent<AllProps> = props => (
  <Snackbar
    open={props.alertSnackbar.open}
    autoHideDuration={5000}
    onClose={() => props.setAlertSnackbar({ open: false, message: null })}
    ContentProps={{
      'aria-describedby': 'snackbar',
    }}
    message={
      <span id="snackbar">
        {props.alertSnackbar.message}
      </span>
    }
    action={
      <Button 
        color="inherit" 
        size="small" 
        onClick={() => props.setAlertSnackbar({ open: false, message: null })}>
        <CloseIcon />
      </Button>
    }
  />
);

export default bottomSnackbar;