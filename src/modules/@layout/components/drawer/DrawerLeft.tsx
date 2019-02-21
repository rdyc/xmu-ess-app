import AppEvent from '@constants/AppEvent';
import { Anchor } from '@layout/types';
import { Drawer, WithStyles, withStyles, withWidth } from '@material-ui/core';
import { isWidthDown, isWidthUp, WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import * as React from 'react';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { Navigation } from '../navigation/Navigation';

interface IOwnOption {
  anchor: Anchor;
}

interface IOwnState {
  isOpen: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setVisibility: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnEventDrawerLeft: (event: CustomEvent) => void;
}

type DrawerLeftProps 
  = IOwnOption 
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithWidth
  & WithStyles<typeof styles>;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isOpen: true
});

const DrawerLeftView: React.SFC<DrawerLeftProps> = props => (
  <Drawer
    variant={isWidthUp('md', props.width) ? 'permanent' : 'temporary'}
    anchor={props.anchor}
    open={props.isOpen}
    classes={{
      paper: props.classes.drawerPaper,
    }}
    ModalProps={{
      keepMounted: true
    }}
    onClose={props.setVisibility}
    onRendered={() => {
      if (isWidthDown('sm', props.width)) {
        props.setVisibility();
      }
    }}
  >
    <Navigation />
  </Drawer>
);

const stateUpdaters: StateUpdaters<DrawerLeftProps, IOwnState, IOwnStateUpdater> = {
  setVisibility: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    isOpen: !prevState.isOpen
  })
};

const handlerCreators: HandleCreators<DrawerLeftProps, IOwnHandler> = {
  handleOnEventDrawerLeft: (props: DrawerLeftProps) => (event: CustomEvent) => {
    props.setVisibility();
  }
};

const lifecycles: ReactLifeCycleFunctions<DrawerLeftProps, {}> = {
  componentDidMount() {
    addEventListener(AppEvent.DrawerLeft, this.props.handleOnEventDrawerLeft);
  },
  componentWillUnmount() {
    removeEventListener(AppEvent.DrawerLeft, this.props.handleOnEventDrawerLeft);
  }
};

export const DrawerLeft = compose<IOwnOption, IOwnOption>(
  setDisplayName('DrawerLeft'),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withWidth(),
  withStyles(styles)
)(DrawerLeftView);