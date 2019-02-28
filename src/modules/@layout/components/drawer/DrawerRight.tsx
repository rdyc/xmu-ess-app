import AppEvent from '@constants/AppEvent';
import { SwipeableDrawer, WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
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

import { Notification } from '../notification/Notification';

interface IOwnOption {
}

interface IOwnState {
  isOpen: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setOpen: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnChangeDrawerRight: (event: CustomEvent) => void;
}

type DrawerRightProps 
  = IOwnOption 
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithWidth
  & WithStyles<typeof styles>;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isOpen: false
});

const DrawerRightView: React.SFC<DrawerRightProps> = props => (
  <SwipeableDrawer
    anchor="right"
    open={props.isOpen}
    variant="temporary"
    classes={{
      paper: props.classes.drawerPaper
    }} 
    ModalProps={{
      keepMounted: true
    }}
    onOpen={props.setOpen}
    onClose={props.setOpen}
  >
    <Notification />
  </SwipeableDrawer>
);

const stateUpdaters: StateUpdaters<DrawerRightProps, IOwnState, IOwnStateUpdater> = {
  setOpen: (State: IOwnState) => (): Partial<IOwnState> => ({
    isOpen: !State.isOpen
  })
};

const handlerCreators: HandleCreators<DrawerRightProps, IOwnHandler> = {
  handleOnChangeDrawerRight: (props: DrawerRightProps) => (event: CustomEvent) => {
    props.setOpen();
  }
};

const lifecycles: ReactLifeCycleFunctions<DrawerRightProps, {}> = {
  componentDidMount() {
    addEventListener(AppEvent.onChangeDrawerRight, this.props.handleOnChangeDrawerRight);
  },
  componentWillUnmount() {
    removeEventListener(AppEvent.onChangeDrawerRight, this.props.handleOnChangeDrawerRight);
  }
};

export const DrawerRight = compose<IOwnOption, IOwnOption>(
  setDisplayName('DrawerRight'),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withWidth(),
  withStyles(styles)
)(DrawerRightView);