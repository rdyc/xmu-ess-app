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
  anchor: Anchor;
}

interface IOwnState {
  isOpen: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setVisibility: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnEventMenu: (event: CustomEvent) => void;
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
    variant="temporary"
    anchor={props.anchor === 'left' ? 'right' : 'left'}
    classes={{
      paper: classNames(props.classes.drawerPaper, props.classes.drawerPaperAdditional)
    }} 
    open={props.isOpen}
    onOpen={props.setVisibility}
    onClose={props.setVisibility}
    ModalProps={{
      keepMounted: true, // Better open performance on mobile.
    }}
  >
    <Notification onClose={props.setVisibility} />
  </SwipeableDrawer>
);

const stateUpdaters: StateUpdaters<DrawerRightProps, IOwnState, IOwnStateUpdater> = {
  setVisibility: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    isOpen: !prevState.isOpen
  })
};

const handlerCreators: HandleCreators<DrawerRightProps, IOwnHandler> = {
  handleOnEventMenu: (props: DrawerRightProps) => (event: CustomEvent) => {
    props.setVisibility();
  }
};

const lifecycles: ReactLifeCycleFunctions<DrawerRightProps, {}> = {
  componentDidMount() {
    addEventListener(AppEvent.onClickNotif, this.props.handleOnEventMenu);
  },
  componentWillUnmount() {
    removeEventListener(AppEvent.onClickNotif, this.props.handleOnEventMenu);
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