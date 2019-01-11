import AppMenu from '@constants/AppMenu';
import { homeMessage } from '@home/locales/messages';
import { ModuleDefinition, NotificationType, redirector } from '@layout/helper/redirector';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles, WithTheme, withTheme } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { dashboardView } from './dashboardView';

interface OwnItem {
  cIndex: number;
  dIndex: number;
  expanded: boolean;
}

interface OwnState {
  items: OwnItem[];
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  handleExpandClick: StateHandler<OwnState>;
  handleReset: StateHandler<OwnState>;
}

interface OwnHandlers {
  isExpanded: (cIndex: number, dIndex: number) => boolean;
  handleSyncClick: () => void;
  handleNotifClick: (category: ModuleDefinition, type: NotificationType, uid?: string) => void;
}

export type DashboardProps
  = WithUser
  & WithNotification
  & WithLayout
  & WithAppBar
  & WithTheme
  & WithStyles<typeof styles>
  & InjectedIntlProps
  & RouteComponentProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers;

const createProps: mapper<DashboardProps, OwnState> = (props: DashboardProps): OwnState => ({
  items: []
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  handleExpandClick: (prevState: OwnState) => (cIndex: number, dIndex: number): OwnState => {
    const prevItems = prevState.items;
    const prevItemIndex = prevState.items.findIndex(item =>
      item.cIndex === cIndex &&
      item.dIndex === dIndex
    );

    if (prevItemIndex !== -1) {
      prevItems[prevItemIndex].expanded = !prevItems[prevItemIndex].expanded;
    } else {
      prevItems.push({
        cIndex,
        dIndex,
        expanded: true
      });
    }

    return {
      items: prevItems
    };
  },
  handleReset: (prevState: OwnState) => (index: number): OwnState => ({
    items: []
  })
};

const handlerCreators: HandleCreators<DashboardProps, OwnHandlers> = {
  isExpanded: (props: DashboardProps) => (cIndex: number, dIndex: number): boolean => {
    let isExpanded = false;

    const existItem = props.items.find(item =>
      item.cIndex === cIndex &&
      item.dIndex === dIndex
    );

    if (existItem) {
      isExpanded = existItem.expanded;
    }

    return isExpanded;
  },
  handleSyncClick: (props: DashboardProps) => () => {
    const { user } = props.userState;
    const { fetchRequest } = props.notificationDispatch;

    if (user) {
      props.handleReset();

      fetchRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid
      });
    }
  },
  handleNotifClick: (props: DashboardProps) => (category: ModuleDefinition, type: NotificationType, uid?: string) => {
    const redirect = redirector(category, type, uid);

    props.history.push(redirect.path, redirect.state);
  }
};

const lifecycles: ReactLifeCycleFunctions<DashboardProps, {}> = {
  componentDidMount() {
    const { intl, layoutDispatch } = this.props;
    
    layoutDispatch.changeView({
      uid: AppMenu.Dashboard,
      parentUid: AppMenu.Home,
      title: intl.formatMessage(homeMessage.dashboard.page.title),
      subTitle: intl.formatMessage(homeMessage.dashboard.page.subHeader)
    });
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();

    appBarDispatch.dispose();
  }
};

export const Dashboard = compose<DashboardProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withNotification,
  withTheme(),
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(dashboardView);