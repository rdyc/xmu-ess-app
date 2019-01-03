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
import { IMileageRequest } from '@mileage/classes/response';
import * as React from 'react';
import { EmployeeFilterProps } from './EmployeeFilter';

export const EmployeeFilterView: React.SFC<EmployeeFilterProps> = props => {
  const { response } = props.mileageApprovalState.all;
  const employee: string[] = [];

  const renderItem = (item: IMileageRequest) => {
    if (employee.indexOf(item.employeeUid) === -1) {
      employee.push(item.employeeUid);

      return (
        <React.Fragment key={item.uid}>
          <ListItem button onClick={() => props.onSelected(item)}>
            <Radio color="primary" checked={props.value && props.value === item.employeeUid || false} />
            <ListItemText primary={item.employee && item.employee.fullName} />
          </ListItem>
          <Divider/>
        </React.Fragment>  
      );
    }
    return null;
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