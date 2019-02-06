import { Anchor } from '@layout/types';
import { Drawer, withWidth } from '@material-ui/core';
import { isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import * as React from 'react';
import { compose, setDisplayName } from 'recompose';

import { Navigation } from '../navigation/Navigation';

interface IOwnOption {
  isOpen: boolean;
  variant: 'permanent' | 'persistent' | 'temporary';
  anchor: Anchor;
  className: string;
  onClose: () => void;
}

const DrawerLeftView: React.SFC<IOwnOption & WithWidth> = props => (
  <Drawer
    variant={props.variant}
    anchor={props.anchor}
    open={props.isOpen}
    classes={{
      paper: props.className,
    }}
    ModalProps={{
      keepMounted: true
    }}
    onClose={() => props.onClose()}
    onRendered={() => {
      if (isWidthDown('sm', props.width)) {
        props.onClose();
      }
    }}
  >
    <Navigation onClose={props.onClose} />
  </Drawer>
);

export const DrawerLeft = compose<IOwnOption, IOwnOption>(
  setDisplayName('DrawerLeft'),
  withWidth()
)(DrawerLeftView);