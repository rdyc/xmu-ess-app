import { IEmployee } from '@account/classes/response';
import { Avatar, ListItem, ListItemAvatar, ListItemText, WithStyles } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import styles from '@styles';
import * as React from 'react';

interface OwnProps {
  data: IEmployee;
  onClick?: () => void;
  action?: JSX.Element;
}

type AllProps = WithStyles<typeof styles> & OwnProps;

export const ListItemEmployee: React.ComponentType<AllProps> = props => (
  <ListItem 
    disableGutters
    key={props.data.uid}
    onClick={props.onClick}>
    <ListItemAvatar 
      className={props.data.uid ? '' : props.classes.hide}
    >
      <Avatar>
        <PersonIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={props.data.fullName}
      secondary={props.data.email} 
      primaryTypographyProps={{ noWrap: true}}
      secondaryTypographyProps={{ noWrap: true}}
    />
    {props.action}
  </ListItem>
);