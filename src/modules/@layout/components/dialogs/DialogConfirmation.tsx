import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import * as React from 'react';

interface OwnProps {
  isOpen: boolean;
  fullScreen?: boolean | false;
  title: string;
  content: string;
  labelCancel: string;
  labelConfirm: string;
  onClickCancel: () => void;
  onClickConfirm: () => void;
}

export const DialogConfirmation: React.SFC<OwnProps> = props => (
  <Dialog
    fullScreen={props.fullScreen}
    open={props.isOpen}
    aria-labelledby="dialog-confirm-title"
    aria-describedby="dialog-confirm-description"
  >
    <DialogTitle id="dialog-confirm-title">
      {props.title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="dialog-confirm-description">
        {props.content}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onClickCancel} color="primary">
        {props.labelCancel}
      </Button>
      <Button onClick={props.onClickConfirm} color="primary" autoFocus>
        {props.labelConfirm}
      </Button>
    </DialogActions>
  </Dialog>
);