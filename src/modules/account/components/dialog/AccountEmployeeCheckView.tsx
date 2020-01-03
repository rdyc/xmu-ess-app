import { layoutMessage } from '@layout/locales/messages';
import {
  AppBar,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import * as classNames from 'classnames';
import * as React from 'react';

import { AccountEmployeeCheckProps } from './AccountEmployeeCheck';

export const AccountEmployeeCheckView: React.SFC<AccountEmployeeCheckProps> = props => {
  // const { itemCheck } = props;
  const checkTrue = (uid: string) => {
    const index = props.itemCheck.findIndex(item => item.employee.uid === uid);
    if (props.itemCheck && index !== -1) {
      return props.itemCheck[index].isCheck;
    }
    return false;
  };
  
  return (
    <Dialog 
      open={props.isOpen}
      fullScreen
      scroll="paper"
      hideBackdrop={props.hideBackdrop}
      aria-labelledby="account-employee-check-title"
      className={props.classes.shift}
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
            
          <Button 
            color="inherit" 
            onClick={props.handleReset}
          >
            {props.intl.formatMessage(layoutMessage.action.reset)}
          </Button>
          
          <Button 
            color="inherit" 
            onClick={() => props.onSelected(props.itemCheck)}
          >
            {props.intl.formatMessage(layoutMessage.action.apply)}
          </Button>
        </Toolbar>
      </AppBar>
      
      <Divider/>

      <DialogContent className={props.classes.paddingDisabled}>        
        <List>
          {
            !props.accountEmployeeState.list.isLoading &&
            props.itemCheck &&
            props.employees &&
            props.employees.map((item, index) => 
              <React.Fragment key={index}>
                <ListItem button onClick={() => props.handleItemCheck(item.uid)}>
                  <Checkbox color="secondary" checked={checkTrue(item.uid)} />
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
};