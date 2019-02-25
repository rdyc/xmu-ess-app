import AppEvent from '@constants/AppEvent';
import { Anchor } from '@layout/types';
import { SwipeableDrawer, WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import * as classNames from 'classnames';
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
  anchor: props.defaultAnchor,
  isOpen: false
});

const DrawerRightView: React.SFC<DrawerRightProps> = props => (
  <SwipeableDrawer
    open={props.isOpen}
    variant="temporary"
    anchor={props.anchor === 'left' ? 'right' : 'left'}
    classes={{
      paper: classNames(props.classes.drawerPaper, props.classes.drawerPaperAdditional)
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
  setAnchor: (state: IOwnState) => (): Partial<IOwnState> => ({
    anchor: state.anchor === 'left' ? 'right' : 'left'
  }),
  setOpen: (State: IOwnState) => (): Partial<IOwnState> => ({
    isOpen: !State.isOpen
  })
};

const handlerCreators: HandleCreators<DrawerRightProps, IOwnHandler> = {
  handleOnChangeAnchor: (props: DrawerRightProps) => (event: CustomEvent) => {
    props.setAnchor();
  },
  handleOnChangeDrawerRight: (props: DrawerRightProps) => (event: CustomEvent) => {
    props.setOpen();
  }
};

const lifecycles: ReactLifeCycleFunctions<DrawerRightProps, {}> = {
  componentDidMount() {
    addEventListener(AppEvent.onChangeAnchor, this.props.handleOnChangeAnchor);
    addEventListener(AppEvent.onChangeDrawerRight, this.props.handleOnChangeDrawerRight);
  },
  componentWillUnmount() {
    removeEventListener(AppEvent.onChangeAnchor, this.props.handleOnChangeAnchor);
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