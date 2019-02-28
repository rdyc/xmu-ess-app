import AppEvent from '@constants/AppEvent';
import { IPageInfo } from '@generic/interfaces';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
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
  defaultHeaderUid?: string;
  defaultChildUid?: string;
}

interface IOwnState {
  headerUid?: string;
  childUid?: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setHeader: StateHandler<IOwnState>;
  setHeaderAndChild: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnChangePage: (event: CustomEvent<IPageInfo>) => void;
  handleOnClickMenuHeader: (uid: string) => void;
  handleOnClickMenuItem: (headerUid: string, childUid: string, closeMenu: boolean) => void;
}

export type NavigationProps 
  = IOwnOption
  & IOwnState 
  & IOwnStateUpdaters
  & IOwnHandler
  & WithUser 
  & WithMasterPage
  & WithWidth
  & WithStyles<typeof styles>;

const createProps: mapper<NavigationProps, IOwnState> = (props: NavigationProps) => ({ 
  headerUid: props.defaultHeaderUid,
  childUid: props.defaultChildUid
});

const stateUpdaters: StateUpdaters<NavigationProps, IOwnState, IOwnStateUpdaters> = {
  setHeader: (prevState: IOwnState) => (uid?: string): Partial<IOwnState> => ({
    headerUid: uid
  }),
  setHeaderAndChild: (prevState: IOwnState) => (headerUid: string, childUid: string): Partial<IOwnState> => ({
    headerUid,
    childUid
  })
};

const handlerCreator: HandleCreators<NavigationProps, IOwnHandler> = {
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

const lifecycles: ReactLifeCycleFunctions<NavigationProps, IOwnState> = {
  componentWillMount() {
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