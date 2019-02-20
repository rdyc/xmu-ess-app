import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import * as React from 'react';

import { MoreOptionProps } from '.';

export const MoreOptionView: React.SFC<MoreOptionProps> = props => (
  <React.Fragment>
    <IconButton
      id={props.id}
      onClick={props.handleVisibility}
    >
      <MoreVert/>
    </IconButton>

    <Menu
      id="appbar-more-menu" 
      anchorEl={document.getElementById(props.id)} 
      open={props.isOpen} 
      onClose={props.handleVisibility}
    >
      {
        props.menuItems && 
        props.menuItems
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