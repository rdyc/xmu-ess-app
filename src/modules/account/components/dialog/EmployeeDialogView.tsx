import {
  AppBar,
  Avatar,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { List as VirtualizedList, ListRowProps } from 'react-virtualized';

import { EmployeeDialogProps } from './EmployeeDialog';

export const EmployeeDialogView: React.SFC<EmployeeDialogProps> = props => {
  const { isOpen, _search } = props;
  const { intl } = props;
  const { onSelected, onClose, filterEmployees, searchOnChange, searchOnKeyUp } = props;
  const { response } = props.accountEmployeeState.list;

  const employees = filterEmployees(response);

  const rowRenderer = (row: ListRowProps) => {
    if (employees.length > 0) {
      const employee = employees[row.index];

      if (!employee) {
        return;
      }

      return (
        <ListItem 
          button 
          key={row.index}
          style={{...row.style}}
          onClick={() => onSelected(employee)}
        >
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText 
            color="primary"
            primary={employee.fullName}
            secondary={employee.company && employee.company.name}
            primaryTypographyProps={{
              noWrap: true
            }}
          />
        </ListItem>
      );
    }

    return null;
  };

  const render = (
    <Dialog 
      fullScreen
      hideBackdrop={props.hideBackdrop}
      className={props.layoutState.anchor === 'right' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
      open={isOpen}
      aria-labelledby="employee-dialog-title"
      scroll="paper"
      onClose={onClose}
    >
      <AppBar position="fixed" className={props.classes.appBarDialog}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => onClose()} aria-label="Close">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={props.classes.flex}>
            <FormattedMessage id="account.employee.filter.employee" />
          </Typography>
          <Button color="inherit" onClick={() => onClose()}>
            <FormattedMessage id="global.action.discard" />
          </Button>
        </Toolbar>
      </AppBar>
      
      <DialogContent className={props.classes.paddingDisabled}>
        <div className={props.classes.paddingFar}>
          <TextField
            id="employee-selector-text"
            fullWidth
            margin="normal"
            value={_search}
            disabled={!response}
            label={<FormattedMessage id="global.search" />}
            placeholder={intl.formatMessage({ id: 'account.employee.filter.placeholder.employeeSearch' })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={searchOnChange}
            onKeyUp={searchOnKeyUp}
          />
        </div>
        
        <List>
          <VirtualizedList
            width={9999}
            height={9999}
            autoWidth
            autoHeight
            rowCount={employees.length}
            rowHeight={70}
            rowRenderer={rowRenderer}
          />
        </List>
      </DialogContent>
    </Dialog>
  );

  return render;
};