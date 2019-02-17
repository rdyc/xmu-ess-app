import { initialName } from '@layout/helper/initialName';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import * as React from 'react';

import { AccountEmployeeDialog } from '../dialog';
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
            <Avatar className={props.classes.avatarSecondary}>
              {initialName(props.selected.fullName)}
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

    <AccountEmployeeDialog
      isOpen={props.isOpenDialog}
      title={props.title}
      value={props.selected && props.selected.uid}
      filter={{
        companyUids: props.userState.user && props.userState.user.company.uid,
        useAccess: true,
        orderBy: 'fullName',
        direction: 'ascending'
      }}
      hideBackdrop={false}
      onSelected={props.handleOnClickItem}
      onClose={props.handleDialog}
    />
  </React.Fragment>
);