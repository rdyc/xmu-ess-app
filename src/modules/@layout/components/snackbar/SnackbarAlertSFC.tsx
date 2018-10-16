import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { compose } from 'recompose';
import { isNullOrUndefined, isObject } from 'util';

const SnackbarAlertSFC: React.SFC<WithLayout> = props => {
  const { layoutState, layoutDispatch } = props;
  const alert = layoutState.alerts[0];

  const handleClose = () => {
    layoutDispatch.alertDialogHide();
    layoutDispatch.alertDismiss();
  };

  const handleDetailClick = () => {
    layoutDispatch.alertDialogShow();
  };

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
          <FormattedMessage id="global.action.details" />
        </Button>
      );
    }

    actions.push(
      <IconButton 
        key="close" 
        color="secondary" 
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
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
          {alert && isObject(alert.details) && (
            <pre>{JSON.stringify(alert.details, null, 2)}</pre>
          )}
          {alert && !isObject(alert.details) && alert.details}
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
      {
        alert &&
        <Snackbar
          open
          onClose={handleClose}
          ContentProps={{
            'aria-describedby': 'snackbar'
          }}
          message={<span id="snackbar">{alert.message}</span>}
          action={renderActions()}
        />
      }
      {renderDialog}
    </div>
  );
};

const enhance = compose(
  withLayout
)(SnackbarAlertSFC);

export default enhance;