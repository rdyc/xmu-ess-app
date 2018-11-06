import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import * as React from 'react';

interface OwnProps {
  isOpen: boolean;
  fullScreen?: boolean | false;
  title: string;
  contentText: string;
  labelOk: string;
  onClickOk: () => void;
}

export const DialogAlert: React.SFC<OwnProps> = props => (
  <Dialog
    fullScreen={props.fullScreen}
    open={props.isOpen}
    aria-labelledby="dialog-alert-title"
    aria-describedby="dialog-alert-description"
  >
    <DialogTitle id="dialog-alert-title">
      {props.title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="dialog-alert-description">
        {props.contentText}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onClickOk} color="primary" autoFocus>
        {props.labelOk}
      </Button>
    </DialogActions>
  </Dialog>
);