import { layoutMessage } from '@layout/locales/messages';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import AddIcon from '@material-ui/icons/Add';
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
      fullScreen={isWidthDown('sm', props.width)}
      open={props.open}
      aria-labelledby="account-employee-dialog-title"
      onClose={props.handleDialog}
    >
      <DialogTitle 
        id="account-employee-dialog-title"
        disableTypography
      >
        <Typography variant="h6" color="primary">
          <FormattedMessage id="account.employee.lookupTitle" />
        </Typography>

        {/* <Typography variant="body2">
          <FormattedMessage id="account.employee.lookupDescription" />
        </Typography> */}
        
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
      </DialogTitle>
      
      <DialogContent
        style={{ 
          padding: 0 
        }}
      >
        <List>
          <VirtualizedList
            width={600}
            height={550}
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
      <DialogActions>
        <Button 
          onClick={props.handleDialog} 
          color="secondary"
        >
          {props.intl.formatMessage(layoutMessage.action.discard)}
        </Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
);