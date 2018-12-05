import AppMenu from '@constants/AppMenu';
import { homeMessage } from '@home/locales/messages';
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
  handleNotifClick: (category: string, type: string, uid: string) => void;
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
  handleNotifClick: (props: DashboardProps) => (category: string, type: string, uid: string) => {
    const { history } = props;

    switch (category) {
      // todo: complete all categories in each modules
      case 'Project Registration':
        if (type === 'Approval' || type === 'Notify') {
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

      case 'Leave':
        if (type === 'Approval') {
          history.push(`/leave/approvals/${uid}`);
        } else {
          history.push(`/leave/requests/${uid}`);
        }
        break;

      case 'Expense':
        if (type === 'Approval' || type === 'Notify') {
          history.push(`/expense/approvals/${uid}`);
        } else {
          history.push(`/expense/requests/${uid}`);
        }
        break;

      case 'Timesheet':
        if (type === 'Approval' || type === 'Notify') {
          history.push(`/timesheet/approvals/${uid}`);
        } else {
          history.push(`/timesheet/entry/${uid}`);
        }
        break;
        
      case 'Travel':
        if (type === 'Approval' || type === 'Notify') {
          history.push(`/travel/approvals/${uid}`);
        } else {
          history.push(`/travel/requests/${uid}`);
        }
        break;

      case 'Travel Settlement':
        if (type === 'Approval' || type === 'Notify') {
          history.push(`/travel/settlement/approvals/${uid}`);
        } else {
          history.push(`/travel/settlements/${uid}`);
        }
        break;        
    
      case 'Purchase':
        if (type === 'Approval' || type === 'Notify' || type === 'Rejected') {
          history.push(`/purchase/approvals/${uid}`);
        } else if (type === 'Settlement') {
          history.push(`/purchase/settlement/requests/form`, {uid});
        } else {
          history.push(`/purchase/requests/${uid}`);
        }
        break;
    
      case 'Purchase Settlement':
        if (type === 'Approval' || type === 'Notify' || type === 'Rejected') {
          history.push(`/purchase/settlement/approvals/${uid}`);
        } else {
          history.push(`/purchase/settlement/requests/${uid}`);
        }
        break;
    
      case 'Mileage':
        if (type === 'Approval' || type === 'Notify') {
          history.push(`/mileage/approvals/${uid}`);
        } else {
          history.push(`/mileage/requests/${uid}`);          
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
      subTitle: intl.formatMessage(homeMessage.dashboard.page.subHeader)
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
  withTheme(),
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(dashboardView);