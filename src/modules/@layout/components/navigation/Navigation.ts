import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
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

import { NavigationView } from './NavigationView';

interface IOwnOption {
  onClose: () => void;
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
  handleOnClickMenuHeader: (uid: string) => void;
  handleOnClickMenuItem: (headerUid: string, childUid: string, closeMenu: boolean) => void;
}

export type NavigationProps 
  = OwnState 
  & OwnStateUpdaters
  & OwnHandler
  & WithUser 
  & WithLayout 
  & WithWidth
  & WithStyles<typeof styles>
  & RouteComponentProps;

const createProps: mapper<NavigationProps, OwnState> = (props: NavigationProps) => ({ 
  headerUid: props.layoutState.view && props.layoutState.view.parentUid,
  childUid: props.layoutState.view && props.layoutState.view.uid
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
  handleOnClickMenuHeader: (props: NavigationProps) => (uid: string) => {
    if (props.headerUid !== uid) {
      props.setHeader(uid);
    } else {
      props.setHeader();
    }
  },
  handleOnClickMenuItem: (props: NavigationProps) => (headerUid: string, childUid: string, closeMenu: boolean) => {
    props.setHeaderAndChild(headerUid, childUid);

    props.history.push(menuLinkMapper(childUid));

    if (closeMenu) {
      props.onClose();
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<NavigationProps, OwnState> = {
  componentDidUpdate(prevProps: NavigationProps) {
    if (this.props.layoutState.view !== prevProps.layoutState.view) {
      const { view } = this.props.layoutState;

      if (view) {
        this.props.setHeaderAndChild(view.parentUid, view.uid);
      }
    }
  }
};

export const Navigation = compose<NavigationProps, IOwnOption>(
  setDisplayName('Navigation'),
  withUser,
  withLayout,
  withRouter,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreator),
  lifecycle(lifecycles),
  withWidth(),
  withStyles(styles)
)(NavigationView);