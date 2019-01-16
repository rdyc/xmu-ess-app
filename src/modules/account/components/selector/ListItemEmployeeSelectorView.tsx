import {
  AppBar,
  Avatar,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { List as VirtualizedList, ListRowProps } from 'react-virtualized';

import { ListItemEmployeeSelectorProps } from './ListItemEmployeeSelector';

export const ListItemEmployeeSelectorView: React.SFC<ListItemEmployeeSelectorProps> = props => (
  <React.Fragment>
    <ListItem 
      disableGutters
      onClick={props.onClick}
      >
        {
          props.selected &&
          <React.Fragment>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={props.selected.fullName}
              secondary={props.selected.email} 
              primaryTypographyProps={{ noWrap: true}}
              secondaryTypographyProps={{ noWrap: true}}
            />
          </React.Fragment>
        }
      
      <ListItemSecondaryAction>
        {
          props.selected &&
          <React.Fragment>
            <IconButton
              onClick={props.handleOnDiscard}
            >
              <CloseIcon/>
            </IconButton>
            <IconButton 
              onClick={props.handleOnSelected}
            >
              <DoneIcon/>
            </IconButton>
          </React.Fragment>
        }

        {
          !props.selected &&
          <IconButton 
            onClick={props.handleDialog}
          >
            <AddIcon/>
          </IconButton>
        }
      </ListItemSecondaryAction>
    </ListItem>

    <Dialog 
      fullScreen
      open={props.open}
      className={props.layoutState.anchor === 'right' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
      scroll="paper"
      onClose={props.handleDialog}
    >
      <AppBar position="fixed" className={props.classes.appBarDialog}>
        <Toolbar>
          <IconButton color="inherit" onClick={props.handleDialog} aria-label="Close">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={props.classes.flex}>
            <FormattedMessage id="account.employee.lookupTitle" />
          </Typography>
        </Toolbar>
      </AppBar>
      
      <DialogContent className={props.classes.paddingDisabled}>
        <div className={props.classes.paddingFar}>
          <TextField
            id="account-employee-selector-text"
            fullWidth
            margin="normal"
            value={props.search}
            disabled={!props.accountEmployeeState.list.response}
            label={<FormattedMessage id="global.search" />}
            placeholder={props.intl.formatMessage({ id: 'account.placeholder.lookupSearch' })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={props.handleOnChangeSearch}
            onKeyUp={props.handleOnKeyUpSearch}
          />
        </div>

        <List>
          <VirtualizedList
            width={9999}
            height={9999}
            autoWidth
            autoHeight
            rowCount={props.filteredData().length}
            rowHeight={60}
            rowRenderer={(row: ListRowProps) => {
              const employees = props.filteredData();

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
                    onClick={() => props.handleOnClickItem(employee)}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      color="primary"
                      primary={employee.fullName}
                      secondary={employee.email}
                      primaryTypographyProps={{
                        noWrap: true
                      }}
                      secondaryTypographyProps={{
                        noWrap: true
                      }}
                    />
                  </ListItem>
                );
              }

              return null;
            }}
          />
        </List>
      </DialogContent>
    </Dialog>
  </React.Fragment>
);