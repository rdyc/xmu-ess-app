import { layoutMessage } from '@layout/locales/messages';
import {
  AppBar,
  Dialog,
  DialogContent,
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
      className={props.theme.direction === 'rtl' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
      open={props.isOpen}
      scroll="paper"
      onClose={props.onClose}
    >
      <AppBar 
        elevation={0}
        position="fixed" 
        color="default"
        className={props.classes.appBarDialog}
      >
        <Toolbar>
          <IconButton color="inherit" onClick={props.onClose} aria-label="Close">
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h6" color="inherit" className={props.classes.flex}>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Divider/>

      <DialogContent className={props.classes.paddingDisabled}>
        <List>
          <ListItem button onClick={() => props.onSelected()}>
            <Radio color="secondary" checked={!props.value} />
            <ListItemText primary={props.intl.formatMessage(layoutMessage.text.none)} />
          </ListItem>
          <Divider/>

          {
            response &&
            response.data &&
            response.data.map((item, index) => 
              <React.Fragment key={index}>
                <ListItem button onClick={() => props.onSelected(item)}>
                  <Radio color="secondary" checked={props.value && props.value === item.type || false} />
                  <ListItemText primary={item.name} />
                </ListItem>
                <Divider/>
              </React.Fragment>
            )
          }
        </List>
      </DialogContent>
    </Dialog>
  );
};