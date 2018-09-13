import { Button, Snackbar, WithStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { ConnectedReduxProps } from '../../../../generic/types';
import styles from '../../../../styles';
import { ISnackbarAlert } from '../../interfaces/ISnackbarAlert';
import { setAlertSnackbar } from '../../store/actionCreators';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  alertSnackbar: ISnackbarAlert;
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