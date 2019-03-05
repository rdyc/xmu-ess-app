import { AccountLeave } from '@account/components/leave';
import { Dialog, WithStyles, withStyles } from '@material-ui/core';
// import CloseIcon from '@material-ui/icons/Close';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface IOwnProps {
  isDialogOpen: boolean;
  handleDialog: () => void;
}

type AllProps
  = IOwnProps
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const showInfoLeave: React.SFC<AllProps> = props => {

  const render = (        
    <Dialog
      open={props.isDialogOpen}
      onClose={props.handleDialog}
      scroll="paper"
      onBackdropClick={props.handleDialog}
    >
      {/* <AppBar
        elevation={0}
        position="fixed"
        color="default"
      >
        <Toolbar>
          <IconButton color="inherit" onClick={props.handleDialog} aria-label="Close">
            <CloseIcon />  
          </IconButton>
        </Toolbar>        
      </AppBar> */}
      {/* <DialogTitle>
        Woof Woof  
      </DialogTitle>         */}
      {/* <DialogContent> */}
        <AccountLeave employeeUid={undefined} />
      {/* </DialogContent> */}
    </Dialog>
  );

  return render;
};

export const ShowInfoLeave = compose<AllProps, IOwnProps>(
  injectIntl,
  withStyles(styles)
)(showInfoLeave);