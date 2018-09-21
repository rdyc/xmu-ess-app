import { ConnectedReduxProps } from '@generic/types';
import { ILayoutState } from '@layout/interfaces';
import { layoutChangeAlert } from '@layout/store/actions';
import { Button, Snackbar, WithStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styles from '@styles';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  layoutState: ILayoutState;
}

interface PropsFromDispatch {
  layoutDispatch: {
    changeAlert: typeof layoutChangeAlert;
  };
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;

export const bottomSnackbar: React.StatelessComponent<AllProps> = props => {
  const { layoutState, layoutDispatch } = props;

  if (!layoutState.alert) {
    return null;
  }

  const handleClose = () => {
    layoutDispatch.changeAlert(null);
  };

  return (
    <Snackbar
      open={layoutState.alert.visible}
      autoHideDuration={5000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'snackbar',
      }}
      message={
        <span id="snackbar">
          {layoutState.alert.message}
        </span>
      }
      action={
        <Button 
          color="inherit" 
          size="small" 
          onClick={handleClose}>
          <CloseIcon />
        </Button>
      }
    />
  );
};

export default bottomSnackbar;