import { Anchor } from '@layout/types';
import { Drawer } from '@material-ui/core';
import * as React from 'react';
import { compose, setDisplayName } from 'recompose';

import { Navigation } from '../navigation/Navigation';

interface IOwnOption {
  isOpen: boolean;
  variant: 'permanent' | 'persistent' | 'temporary';
  anchor: Anchor;
  paperClassName: string;
  paperCloseClassName: string;
  paperHeaderClassName: string;
  onClose: () => void;
}

const DrawerLeftView: React.SFC<IOwnOption> = props => (
  <Drawer
    variant={props.variant}
    anchor={props.anchor}
    open={props.isOpen}
    classes={{
      paper: props.paperClassName,
    }}
    onClose={() => props.onClose()}
    ModalProps={{
      keepMounted: true
    }}
  >
    <Navigation onClose={props.onClose}/>
  </Drawer>
);

export const DrawerLeft = compose<IOwnOption, IOwnOption>(
  setDisplayName('DrawerLeft')
)(DrawerLeftView);