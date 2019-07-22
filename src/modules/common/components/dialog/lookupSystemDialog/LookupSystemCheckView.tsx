import { layoutMessage } from '@layout/locales/messages';
import {
  AppBar,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import * as React from 'react';
import { LookupSystemCheckProps } from './LookupSystemCheck';

export const LookupSystemCheckView: React.SFC<LookupSystemCheckProps> = props => {
  const { itemCheck, handleItemCheck } = props;

  return (
    <Dialog
      fullScreen
      disableBackdropClick
      hideBackdrop={props.hideBackdrop}
      className={props.classes.shift}
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

          <Button 
            color="inherit" 
            onClick={() => props.onApply(itemCheck)}
          >
            {props.intl.formatMessage(layoutMessage.action.apply)}
          </Button>
        </Toolbar>
      </AppBar>
      
      <Divider/>

      <DialogContent className={props.classes.paddingDisabled}>
        <List>
          {
            itemCheck &&
            itemCheck.map((item, index) => 
              <React.Fragment key={index}>
                <ListItem button onClick={() => handleItemCheck(index)}>
                  <Checkbox color="primary" checked={itemCheck[index].isCheck}  />
                  <ListItemText primary={item.item.name} />
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