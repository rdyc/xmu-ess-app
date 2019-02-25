import AppEvent from '@constants/AppEvent';
import { IPageInfo } from '@generic/interfaces';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { Anchor } from '@layout/types';
import { WithStyles, withStyles } from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { menuLinkMapper } from '@utils/index';
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

import { NavigationView } from './NavigationView';

interface IOwnOption {
  defaultAnchor: Anchor;
}

interface OwnState {
  headerUid?: string;
  childUid?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setHeader: StateHandler<OwnState>;
  setHeaderAndChild: StateHandler<OwnState>;
}

interface OwnHandler {
  handleOnChangePage: (event: CustomEvent<IPageInfo>) => void;
  handleOnClickMenuHeader: (uid: string) => void;
  handleOnClickMenuItem: (headerUid: string, childUid: string, closeMenu: boolean) => void;
}

export type NavigationProps 
  = IOwnOption
  & OwnState 
  & OwnStateUpdaters
  & OwnHandler
  & WithUser 
  & WithMasterPage
  & WithWidth
  & WithStyles<typeof styles>;

const createProps: mapper<NavigationProps, OwnState> = (props: NavigationProps) => ({ 

});

const stateUpdaters: StateUpdaters<NavigationProps, OwnState, OwnStateUpdaters> = {
  setHeader: (prevState: OwnState) => (uid?: string): Partial<OwnState> => ({
    headerUid: uid
  }),
  setHeaderAndChild: (prevState: OwnState) => (headerUid: string, childUid: string): Partial<OwnState> => ({
    headerUid,
    childUid
  })
};

const handlerCreator: HandleCreators<NavigationProps, OwnHandler> = {
  handleOnChangePage: (props: NavigationProps) => (event: CustomEvent<IPageInfo>) => {
    props.setHeaderAndChild(event.detail.parentUid, event.detail.uid);
  },
  handleOnClickMenuHeader: (props: NavigationProps) => (uid: string) => {
    if (props.headerUid !== uid) {
      props.setHeader(uid);
    } else {
      props.setHeader();
    }
  },
  handleOnClickMenuItem: (props: NavigationProps) => (headerUid: string, childUid: string, closeMenu: boolean) => {
    if (closeMenu) {
      // auto show hide left drawer
      props.masterPage.changeDrawerLeft();
    }
  
    // redirect to route path
    props.masterPage.changeRoute({
      path: menuLinkMapper(childUid)
    });

    // set local states
    props.setHeaderAndChild(headerUid, childUid);
  },
};

const lifecycles: ReactLifeCycleFunctions<NavigationProps, OwnState> = {
  componentWillMount() {
    console.log('Navigation mount');
    addEventListener(AppEvent.onChangePage, this.props.handleOnChangePage);
  },
  componentWillUnmount() {
    removeEventListener(AppEvent.onChangePage, this.props.handleOnChangePage);
  }
};

export const Navigation = compose<NavigationProps, IOwnOption>(
  setDisplayName('Navigation'),
  withUser,
  withMasterPage,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreator),
  lifecycle(lifecycles),
  withWidth(),
  withStyles(styles)
)(NavigationView);