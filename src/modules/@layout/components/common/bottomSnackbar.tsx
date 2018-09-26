import { ConnectedReduxProps } from '@generic/types';
import { ILayoutState } from '@layout/interfaces';
import { layoutAlertDialogHide, layoutAlertDialogShow, layoutAlertDismiss } from '@layout/store/actions';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  WithStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styles from '@styles';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { isNullOrUndefined } from 'util';

interface PropsFromState extends RouteComponentProps<void> {
  layoutState: ILayoutState;
}

interface PropsFromDispatch {
  layoutDispatch: {
    alertDismiss: typeof layoutAlertDismiss;
    alertDialogShow: typeof layoutAlertDialogShow;
    alertDialogHide: typeof layoutAlertDialogHide;
  };
}

type AllProps = PropsFromState & 
                PropsFromDispatch & 
                ConnectedReduxProps & 
                WithStyles<typeof styles>;

export const bottomSnackbar: React.ComponentType<AllProps> = props => {
  const { layoutState, layoutDispatch } = props;

  const handleClose = () => {
    layoutDispatch.alertDialogHide(); 
    layoutDispatch.alertDismiss();
  };

  const handleDetailClick = () => {
    layoutDispatch.alertDialogShow();
  };

  if (layoutState.alerts.length === 0) {
    return null;
  } else {
    const alert = layoutState.alerts[0];

    const renderActions = () => {
      const actions = [];

      if (!isNullOrUndefined(alert.details)) {
        actions.push(
          <Button 
            key="undo" 
            color="secondary" 
            size="small" 
            onClick={handleDetailClick}
          >
            <FormattedMessage id="global.action.details"/>
          </Button>
        );
      }

      actions.push(
        <Button 
          key="close"
          color="inherit" 
          size="small" 
          onClick={handleClose}
        >
          <CloseIcon />
        </Button>
      );

      return actions;
    };

    const renderDialog = (
      <Dialog
        open={layoutState.isAlertDialogVisible}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-details"
      >
        <DialogTitle id="alert-dialog-title">
          <FormattedMessage id="global.dialog.alertTitle" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-details">
            {alert.details}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            <FormattedMessage id="global.action.close" />
          </Button>
        </DialogActions>
      </Dialog>
    );

    return (
      <div>
        {renderDialog}
      
        <Snackbar
          open
          onClose={handleClose}
          ContentProps={{
            'aria-describedby': 'snackbar',
          }}
          message={
            <span id="snackbar">
              {alert.message}
            </span>
          }
          action={renderActions()}
        />
      </div>
    );
  }
};

export default bottomSnackbar;