import AppEvent from '@constants/AppEvent';
import { Anchor } from '@layout/types';
import { SwipeableDrawer, WithStyles, withStyles, withWidth } from '@material-ui/core';
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
  defaultAnchor: Anchor;
}

interface IOwnState {
  anchor: Anchor;
  isOpen: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setAnchor: StateHandler<IOwnState>;
  setOpen: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnChangeAnchor: (event: CustomEvent) => void;
  handleOnChangeDrawerLeft: (event: CustomEvent) => void;
}

type DrawerLeftProps 
  = IOwnOption 
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithWidth
  & WithStyles<typeof styles>;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  anchor: props.defaultAnchor,
  isOpen: true
});

const DrawerLeftView: React.SFC<DrawerLeftProps> = props => (
  <SwipeableDrawer
    open={props.isOpen}
    variant={isWidthUp('md', props.width) ? 'permanent' : 'temporary'}
    anchor={props.anchor}
    classes={{
      paper: props.classes.drawerPaper
    }} 
    ModalProps={{
      keepMounted: true
    }}
    onOpen={props.setOpen}
    onClose={props.setOpen}
    onRendered={() => {
      if (isWidthDown('sm', props.width)) {
        props.setOpen();
      }
    }}
  >
    <Navigation defaultAnchor={props.anchor} />
  </SwipeableDrawer>
);

const stateUpdaters: StateUpdaters<DrawerLeftProps, IOwnState, IOwnStateUpdater> = {
  setAnchor: (state: IOwnState) => (): Partial<IOwnState> => ({
    anchor: state.anchor === 'left' ? 'right' : 'left'
  }),
  setOpen: (state: IOwnState) => (): Partial<IOwnState> => ({
    isOpen: !state.isOpen
  })
};

const handlerCreators: HandleCreators<DrawerLeftProps, IOwnHandler> = {
  handleOnChangeAnchor: (props: DrawerLeftProps) => (event: CustomEvent) => {
    props.setAnchor();
  },
  handleOnChangeDrawerLeft: (props: DrawerLeftProps) => (event: CustomEvent) => {
    props.setOpen();
  }
};

const lifecycles: ReactLifeCycleFunctions<DrawerLeftProps, {}> = {
  componentDidMount() {
    addEventListener(AppEvent.onChangeAnchor, this.props.handleOnChangeAnchor);
    addEventListener(AppEvent.onChangeDrawerLeft, this.props.handleOnChangeDrawerLeft);
  },
  componentWillUnmount() {
    removeEventListener(AppEvent.onChangeAnchor, this.props.handleOnChangeAnchor);
    removeEventListener(AppEvent.onChangeDrawerLeft, this.props.handleOnChangeDrawerLeft);
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