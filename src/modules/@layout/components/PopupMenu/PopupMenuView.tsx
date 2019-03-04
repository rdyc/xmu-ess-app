import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import * as React from 'react';

import { PopupMenuProps } from './PopupMenu';

export const PopupMenuView: React.SFC<PopupMenuProps> = props => (
  <React.Fragment>
    <IconButton
      id={props.id}
      color="inherit"
      onClick={props.handleVisibility}
    >
      <MoreVert/>
    </IconButton>

    <Menu
      id={`${props.id}.menu`} 
      anchorEl={document.getElementById(props.id)} 
      open={props.isOpen} 
      onClose={props.handleVisibility}
    >
      {
        props.menuOptions && 
        props.menuOptions
          .filter(item => item.visible)
          .map((item, index) =>
            <MenuItem 
              button
              key={index}
              value={item.id}
              disabled={!item.enabled}
              onClick={() => props.handleOnSelected(item)} 
            >
              {item.name}
            </MenuItem>  
          )
      }
    </Menu>
  </React.Fragment>
);