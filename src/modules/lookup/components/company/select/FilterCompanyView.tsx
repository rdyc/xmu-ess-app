import { layoutMessage } from '@layout/locales/messages';
import { ICompanyList } from '@lookup/classes/response';
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
import { FilterCompanyProps } from './FilterCompany';

export const FilterCompanyView: React.SFC<FilterCompanyProps> = props => {
  const { response } = props.lookupCompanyState.list;

  const renderItem = (item: ICompanyList) => {
    return (
      <React.Fragment key={item.uid}>
        <ListItem button onClick={() => props.onSelected(item)}>
          <Radio color="primary" checked={props.value && props.value === item.uid || false} />
          <ListItemText primary={item.name} />
        </ListItem>
        <Divider />
      </React.Fragment>
    );
  };

  return (
    <Dialog
      fullScreen
      disableBackdropClick
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
          <ListItemText primary={props.intl.formatMessage(layoutMessage.text.none)}/>
        </ListItem>
        <Divider />

        {
          response &&
          response.data &&
          response.data.map(item =>
            renderItem(item)
          )
        }
      </List>
    </Dialog>
  );
};