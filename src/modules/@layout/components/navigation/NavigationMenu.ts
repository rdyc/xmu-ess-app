import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import withWidth, { isWidthUp, WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { RouteComponentProps, withRouter } from 'react-router';
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
import { menuLinkMapper } from 'utils';

import { navigationMenu } from './NavigationMenuView';

interface OwnState {
  headerUid: string | undefined;
  childUid: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setHeader: StateHandler<OwnState>;
  setHeaderAndChild: StateHandler<OwnState>;
}

interface OwnHandler {
  handleOnClickMenuHeader: (uid: string) => void;
  handleOnClickMenuItem: (headerUid: string, childUid: string) => void;
}

export type NavigationMenuProps 
  = OwnState 
  & OwnStateUpdaters
  & OwnHandler
  & WithUser 
  & WithLayout 
  & WithWidth
  & WithStyles<typeof styles>
  & RouteComponentProps; 

const createProps: mapper<NavigationMenuProps, OwnState> = (props: NavigationMenuProps) => ({ 
  headerUid: props.layoutState.view && props.layoutState.view.parentUid,
  childUid: props.layoutState.view && props.layoutState.view.uid
});

const stateUpdaters: StateUpdaters<NavigationMenuProps, OwnState, OwnStateUpdaters> = {
  setHeader: (prevState: OwnState) => (uid: string): Partial<OwnState> => ({
    headerUid: uid
  }),
  setHeaderAndChild: (prevState: OwnState) => (headerUid: string, childUid: string): Partial<OwnState> => ({
    headerUid,
    childUid
  })
};

const handlerCreator: HandleCreators<NavigationMenuProps, OwnHandler> = {
  handleOnClickMenuHeader: (props: NavigationMenuProps) => (uid: string) => {
    props.setHeader(uid);
  },
  handleOnClickMenuItem: (props: NavigationMenuProps) => (headerUid: string, childUid: string) => {
    props.setHeaderAndChild(headerUid, childUid);

    if (props.layoutState.isDrawerMenuVisible && !isWidthUp('md', props.width)) {
      props.layoutDispatch.drawerMenuHide();
    }

    props.history.push(menuLinkMapper(childUid));
  },
};

const lifecycles: ReactLifeCycleFunctions<NavigationMenuProps, OwnState> = {
  componentDidUpdate(prevProps: NavigationMenuProps, prevState: OwnState) {
    if (this.props.layoutState.view !== prevProps.layoutState.view) {
      const { view } = this.props.layoutState;

      if (view) {
        this.props.setHeaderAndChild(view.parentUid, view.uid);
      }
    }
  }
};

export const NavigationMenu = compose(
  setDisplayName('NavigationMenu'),
  withUser,
  withLayout,
  withWidth(),
  withStyles(styles),
  withRouter,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreator),
  lifecycle(lifecycles)
)(navigationMenu);