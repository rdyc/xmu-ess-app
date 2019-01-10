import { Anchor } from '@layout/types';
import { SwipeableDrawer } from '@material-ui/core';
import * as React from 'react';
import { compose, setDisplayName } from 'recompose';

import { Notification } from '../notification/Notification';

interface IOwnOption {
  isOpen: boolean;
  anchor: Anchor;
  paperClassName: string;
  onClose: () => void;
}

const DrawerRightView: React.SFC<IOwnOption> = props => (
  <SwipeableDrawer
    variant="temporary"
    anchor={props.anchor === 'left' ? 'right' : 'left'}
    classes={{
      paper: props.paperClassName
    }} 
    open={props.isOpen}
    onOpen={() => undefined}
    onClose={() => props.onClose()}
    ModalProps={{
      keepMounted: true, // Better open performance on mobile.
    }}
  >
    <Notification />
  </SwipeableDrawer>
);

export const DrawerRight = compose<IOwnOption, IOwnOption>(
  setDisplayName('DrawerRight')
)(DrawerRightView);