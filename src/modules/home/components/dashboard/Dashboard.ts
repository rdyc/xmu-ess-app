import AppMenu from '@constants/AppMenu';
import { homeMessage } from '@home/locales/messages';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
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
  index: number;
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
  isExpanded: (index: number) => boolean;
  handleSyncClick: () => void;
  handleNotifClick: (category: string, type: string, uid: string) => void;
}

export type DashboardProps
  = WithUser
  & WithNotification
  & WithLayout
  & WithAppBar
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
  handleExpandClick: (prevState: OwnState) => (index: number): OwnState => {
    const prevItems = prevState.items;
    const prevItemIndex =  prevState.items.findIndex(item => item.index === index); 

    if (prevItemIndex !== -1) {
      prevItems[prevItemIndex].expanded = !prevItems[prevItemIndex].expanded; 
    } else {
      prevItems.push({
        index,
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
  isExpanded: (props: DashboardProps) => (index: number): boolean => { 
    let isExpanded = false;

    const existItem = props.items.find(item => item.index === index);

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
  handleNotifClick: (props: DashboardProps) => (category: string, type: string, uid: string) => {
    const { history } = props;

    switch (category) {
      case 'Project Registration':
        if (type === 'Approval') {
          history.push(`/project/approvals/${uid}`);
        } else {
          history.push(`/project/requests/${uid}`);
        }
        break;

      case 'Project Assignment':
        if (type === 'New Assignment') {
          history.push(`/project/acceptances/${uid}`);
        } else {
          history.push(`/project/assignments/${uid}`);
        }
        break;
    
      default:
        break;
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<DashboardProps, {}> = {
  componentDidMount() {
    const { intl, layoutDispatch } = this.props;
    const { loading, result } = this.props.notificationState;

    layoutDispatch.changeView({
      uid: AppMenu.Dashboard,
      parentUid: AppMenu.Home,
      title: intl.formatMessage(homeMessage.dashboard.page.title),
      subTitle : intl.formatMessage(homeMessage.dashboard.page.subHeader)
    });

    if (!loading && !result) {
      this.props.handleSyncClick();
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();
  }
};

export const Dashboard = compose<DashboardProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withNotification,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(dashboardView);