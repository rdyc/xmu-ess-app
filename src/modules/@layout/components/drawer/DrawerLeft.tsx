import AppEvent from '@constants/AppEvent';
import { IPageInfo } from '@generic/interfaces';
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
}

interface IOwnState {
  isOpen: boolean;
  headerUid?: string;
  childUid?: string;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setOpen: StateHandler<IOwnState>;
  setHeaderAndChild: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnChangePage: (event: CustomEvent<IPageInfo>) => void;
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
  isOpen: true
});
  
const DrawerLeftView: React.SFC<DrawerLeftProps> = props => (
  <SwipeableDrawer
    open={props.isOpen}
    variant={isWidthUp('md', props.width) ? 'permanent' : 'temporary'}
    anchor="left"
    classes={{
      paper: props.classes.drawerPaper
    }} 
    ModalProps={{
      keepMounted: true
    }}
    onOpen={props.setOpen}
    onClose={props.setOpen}
    { ...isWidthDown('sm', props.width) && ({onRendered: () => props.setOpen()}) }
  >
    <Navigation 
      defaultHeaderUid={props.headerUid}
      defaultChildUid={props.childUid}
    />
  </SwipeableDrawer>
);

const stateUpdaters: StateUpdaters<DrawerLeftProps, IOwnState, IOwnStateUpdater> = {
  setOpen: (state: IOwnState) => (): Partial<IOwnState> => ({
    isOpen: !state.isOpen
  }),
  setHeaderAndChild: (state: IOwnState) => (headerUid: string, childUid: string): Partial<IOwnState> => ({
    headerUid,
    childUid
  })
};

const handlerCreators: HandleCreators<DrawerLeftProps, IOwnHandler> = {
  handleOnChangePage: (props: DrawerLeftProps) => (event: CustomEvent<IPageInfo>) => {
    props.setHeaderAndChild(event.detail.parentUid, event.detail.uid);
  },
  handleOnChangeDrawerLeft: (props: DrawerLeftProps) => (event: CustomEvent) => {
    props.setOpen();
  }
};

const lifecycles: ReactLifeCycleFunctions<DrawerLeftProps, {}> = {
  componentDidMount() {
    addEventListener(AppEvent.onChangePage, this.props.handleOnChangePage);
    addEventListener(AppEvent.onChangeDrawerLeft, this.props.handleOnChangeDrawerLeft);
  },
  componentWillUnmount() {
    removeEventListener(AppEvent.onChangePage, this.props.handleOnChangePage);
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