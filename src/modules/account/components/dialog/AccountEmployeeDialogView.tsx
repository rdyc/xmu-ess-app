import { layoutMessage } from '@layout/locales/messages';
import {
  AppBar,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Radio,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import * as classNames from 'classnames';
import * as React from 'react';

import { AccountEmployeeDialogProps } from './AccountEmployeeDialog';

export const AccountEmployeeDialogView: React.SFC<AccountEmployeeDialogProps> = props => (
  <Dialog 
    open={props.isOpen}
    fullScreen
    scroll="paper"
    hideBackdrop={props.hideBackdrop}
    aria-labelledby="account-employee-dialog-title"
    className={props.layoutState.anchor === 'right' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
    onClose={props.onClose}
  >
    <AppBar
      elevation={0}
      position="fixed" 
      color="default"
      className={props.classes.appBarDialog}
    >
      <Toolbar>
        <IconButton color="inherit" onClick={() => props.onClose()} aria-label="Close">
          <ArrowBackIcon />
        </IconButton>
        
        <Typography 
          variant="h6" 
          color="inherit" 
          className={classNames(props.classes.flex, props.classes.appBarTitle)}
        >
          {props.title}
        </Typography>

        <div className={props.classes.search}>
          <div className={props.classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            value={props.search}
            disabled={props.accountEmployeeState.list.isLoading}
            placeholder={props.intl.formatMessage(layoutMessage.text.search)}
            classes={{
              root: props.classes.searchRoot,
              input: props.classes.searchInput,
            }}
            onChange={props.handleOnChangeSearch}
            onKeyUpCapture={props.handleOnKeyUpSearch}
          />
        </div>
      </Toolbar>
    </AppBar>
    
    <Divider/>

    <DialogContent className={props.classes.paddingDisabled}>        
      <List>
        <ListItem button onClick={() => props.onSelected()}>
          <Radio color="primary" checked={!props.value} />
          <ListItemText primary={props.intl.formatMessage(layoutMessage.text.none)} />
        </ListItem>
        <Divider/>

        {
          props.employees &&
          props.employees.map((item, index) => 
            <React.Fragment key={index}>
              <ListItem button onClick={() => props.onSelected(item)}>
                <Radio color="primary" checked={props.value && props.value === item.uid || false} />
                <ListItemText 
                  primary={item.fullName} 
                  secondary={item.email}
                  primaryTypographyProps={{
                    noWrap: true
                  }} 
                  secondaryTypographyProps={{
                    noWrap: true
                  }} 
                />
              </ListItem>
              <Divider/>
            </React.Fragment>
          )
        }
      </List>
    </DialogContent>
  </Dialog>
);