import { ICollectionValue } from '@layout/classes/core';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { compose, setDisplayName } from 'recompose';
import { isNullOrUndefined, isObject } from 'util';

const SnackbarAlertView: React.SFC<WithLayout> = props => {
  const { layoutState, layoutDispatch } = props;
  const alert = layoutState.alerts[0];

  const parseObject = (obj: any): ICollectionValue[] => {
    return Object.keys(obj)
      .map(key => ({ 
        name: key,
        value: obj[key]
      }));
  };

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
          {alert && !isObject(alert.details) && alert.details}
          
          {
            alert && isObject(alert.details) && 
            <List disablePadding>
              {
                parseObject(alert.details).map(item => 
                  <ListItem>
                    <ListItemText 
                      primary={item.name}
                      secondary={item.value}
                    />
                  </ListItem>
                )
              }
            </List>
          }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" autoFocus>
          <FormattedMessage id="global.action.close" />
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export const SnackbarAlert = compose(
  setDisplayName('SnackbarAlert'),
  withLayout
)(SnackbarAlertView);