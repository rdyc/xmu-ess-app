import { layoutMessage } from '@layout/locales/messages';
import {
  AppBar,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Radio,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import * as React from 'react';

import { LookupSystemDialogProps } from './LookupSystemDialog';

export const LookupSystemDialogView: React.SFC<LookupSystemDialogProps> = props => {
  const { response } = props.categoryState();
  
  return (
  <Dialog
    fullScreen
    disableBackdropClick
    hideBackdrop={props.hideBackdrop}
    className={props.layoutState.anchor === 'right' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
    open={props.isOpen}
    onClose={props.onClose}
  >
    <AppBar className={props.classes.appBarDialog}>
      <Toolbar>
        <IconButton color="inherit" onClick={props.onClose} aria-label="Close">
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h6" color="inherit" className={props.classes.flex}>
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>

    <List>
      <ListItem button onClick={() => props.onSelected()}>
        <Radio color="primary" checked={!props.value} />
        <ListItemText primary={props.intl.formatMessage(layoutMessage.text.none)} />
      </ListItem>
      <Divider/>

      {
        response &&
        response.data &&
        response.data.map((item, index) => 
          <React.Fragment key={index}>
            <ListItem button onClick={() => props.onSelected(item)}>
              <Radio color="primary" checked={props.value && props.value === item.type || false} />
              <ListItemText primary={item.name} />
            </ListItem>
            <Divider/>
          </React.Fragment>
        )
      }
    </List>
  </Dialog>
  );
};